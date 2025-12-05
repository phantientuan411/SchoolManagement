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
const getEventForStudent = async(req: express.Request, res: express.Response)=>{
  try {
    const {classmajor, september}=req.body
    const checkClass = await classmajorModel.findById(classmajor);
    if (!checkClass) {
      res.status(404).json({
        message: "không tìm thấy lớp học"
      })
    }
    const event = await EventModel.find({className:classmajor,september:september})
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
    const {rows,major,className} = req.body
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
      data: newEvent});
  } catch (error) {
    return res.status(500).json({ message: "lỗi server" });
  }
}
export { getEventsByPage, searchEvents, newEvent, getEventForStudent}