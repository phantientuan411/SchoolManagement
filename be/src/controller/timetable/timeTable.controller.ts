import EventModel from "../../model/timeTableEvent/timeTableEvent.model.ts";
import express from "express";
import majorModel from "../../model/major/major.model.ts";
import subjectModel from "../../model/major/subject.model.ts";
import classmajorModel from "../../model/major/classmajor.model.ts";
import StudentModel from "../../model/user/student.model.ts";
const getEventsByPage = async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const now = new Date();

    // page = 1 → offset = 0
    // page = 0 → offset = -1
    const offset = page - 1;

    const target = new Date(now);
    target.setDate(now.getDate() + offset * 7);

    const year = target.getFullYear().toString();
    const month = (target.getMonth() + 1).toString();
    const week = Math.ceil(target.getDate() / 7).toString();

    const query = { year, month, week };

    const events = await EventModel.find(query)
      .populate("major")
      .populate("className")
      .populate("rows.name");

    return res.status(200).json({
      page,
      offset,
      week,
      month,
      year,
      total: events.length,
      data: events,
    });

  } catch (err: any) {
    console.error("GetEventsByPage Error:", err);
    return res.status(500).json({ message: err.message });
  }
};
const getAllEvents = async (req: express.Request, res: express.Response) => {
  try {
    const events = await EventModel.find()
      .populate("major")
      .populate("className")
      .populate("rows.name");
    if (events.length === 0) {
      return res.status(404).json({
        message: "không tìm thấy lịch học"
      })
    }
    return res.status(200).json(events)
  }

  catch (error) {
    return res.status(500).json({
      message: "lỗi server"
    })
  }
}
interface ScheduleItem {
  className: string;
  period: string | number;
  subjectName: string;
}

const resgisterEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { major, subjectCode, september } = req.body;

    if (!major || !subjectCode || !september) {
      return res.status(400).json({ message: "Thiếu tham số major hoặc subjectCode" });
    }

    // 1. Lấy TẤT CẢ events của major (vì query lồng không work)
    const events = await EventModel.find({major,september} )
      .select("className rows")
      .lean();

    if (events.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lịch học cho ngành này" });
    }

    // 2. Lấy subject
    const subject = await subjectModel.findById(subjectCode)
      .select("subjectName")
      .lean();

    if (!subject) {
      return res.status(404).json({ message: "Không tìm thấy môn học" });
    }

    const list: ScheduleItem[] = [];
    const subjectCodeStr = subjectCode.toString();

    // 3. Duyệt và filter
    events.forEach(event => {
      event.rows?.forEach((day) => { // Mỗi ngày
        if (Array.isArray(day)) {
          day.forEach((periodSlot) => { // Mỗi tiết
            if (Array.isArray(periodSlot)) { // periodSlot là mảng các lớp học
              periodSlot.forEach((classItem) => {
                if (classItem?.name?.toString() === subjectCodeStr) {
                  list.push({
                    className: event.className?.toString() || "",
                    period: classItem.period,
                    subjectName: subject.subjectName
                  });
                }
              });
            }
          });
        }
      });
    });

    return res.status(200).json(list);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ 
      message: "Lỗi server", 
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    });
  }
};


const searchEvents = async (req: express.Request, res: express.Response) => {
  try {
    const { year, major, month, className, week } = req.query;

    const query: Record<string, any> = {};

    if (year) query.year = year;
    if (major) query.major = major;
    if (month) query.month = month;
    if (className) query.className = className;
    if (week) query.week = week;

    const result = await EventModel.find(query)
      .populate("major")
      .populate("className")
      .populate("rows.name");

    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Search Events Error:", err);
    return res.status(500).json({ message: err.message });
  }
};
const getEventForStudent = async (req: express.Request, res: express.Response) => {
  try {
    const { classmajor, september } = req.body
    const checkClass = await classmajorModel.findById(classmajor);
    if (!checkClass) {
      res.status(404).json({
        message: "không tìm thấy lớp học"
      })
    }
    const event = await EventModel.find({ className: classmajor, september: september })
    if (!event) {
      res.status(404).json({
        message: "không tìm thấy lịch học"
      })
    }
    return res.status(200).json(event)
  } catch (error) {
    return res.status(500).json({ message: "lỗi server" });
  }
}
const newEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { rows, major, className } = req.body
    const checkMajor = await majorModel.findById(major)
    if (!checkMajor) {
      res.status(404).json({
        message: "không tìm thấy ngành học"
      })
    }
    const checkClass = await classmajorModel.findById(className)
    if (!checkClass) {
      res.status(404).json({
        message: "không tìm thấy lớp học"
      })
    }
    for (const row of rows) {
      for (const cell of row) {
        if (cell && Array.isArray(cell)) {
          for (const lesson of cell) {
            const subjectExist = await subjectModel.findById(lesson.name);
            if (!subjectExist) {
              return res.status(400).json({
                message: `Môn học với id ${lesson.name} không tồn tại.`
              });
            }
          }
        }
      }
    }
    const newEvent = EventModel.create(req.body);
    return res.status(200).json({
      message: "tạo thành công",
      data: newEvent
    });
  } catch (error) {
    return res.status(500).json({ message: "lỗi server" });
  }
}
export { resgisterEvent,getAllEvents, getEventsByPage, searchEvents, newEvent, getEventForStudent }