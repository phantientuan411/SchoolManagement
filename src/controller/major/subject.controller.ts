import mongoose from 'mongoose';
import subjectModel from '../../model/major/subject.model.ts';
import * as express from "express"

// Kiểu dữ liệu update
interface EditSubject {
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}

// Kiểu dữ liệu thêm mới
interface NewSubject {
    majorId: string;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}

const getSubjectEqualMajor = async (req: express.Request<{}, {}, {}, { majorId: string }>, res: express.Response) => {
    try {

        const { majorId } = req.query

        const subject = await subjectModel.find({ majorId: majorId })

        const total = await subjectModel.countDocuments({ majorId: majorId })

        if (!subject) {
            return res.status(404).json({ message: "Không tìm thấy môn học" })
        }

        res.status(200).json({
            data: subject,
            total: total,
            majorId: majorId,
            message: "Thành công"
        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const getByMajorId = async(req:express.Request<{majorId:string}, {}, {}, {}>, res:express.Response)=>{
    const id = req.params.majorId;
    console.log(id);
    
    const subject = await subjectModel.find({majorId:id})
    if(!subject){
        return res.status(404).json({message:"Không tìm thấy môn học"})
    }
    res.status(200).json({
        data:subject,
        message:"Thành công"
    })
}

const getSubjectDetail = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params

        const subject = await subjectModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "classstudies",
                    localField: "_id",
                    foreignField: "subjectId",
                    as: "classstudy"
                }
            }
        ])

        res.status(200).json({
            data: subject,
            message: "Thành công"
        })
    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

// Thêm mới subject
const newSubject = async (req: express.Request<{}, {}, NewSubject, {}>, res: express.Response) => {
    try {
        const { majorId, subjectCode, subjectName, numberCredits, totalFee } = req.body;

        await subjectModel.create({
            majorId,
            subjectCode,
            subjectName,
            numberCredits,
            totalFee
        });

        res.status(201).json({ message: "Thêm mới thành công" });

    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Sửa subject
const editSubject = async (req: express.Request<{ id: string }, {}, EditSubject, {}>, res: express.Response) => {
    try {
        const { id } = req.params;
        const editData = req.body;

        const updated = await subjectModel.findByIdAndUpdate(id, editData, { new: true });

        if (!updated) return res.status(404).json({ message: "Không tìm thấy subject" });

        res.status(200).json({ message: "Cập nhật thành công" });

    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
const findSubjectBySemester = async (req: express.Request, res: express.Response) => {
  try {
    const { semester, major } = req.body;

    if (!semester || !major) {
      return res.status(400).json({
        message: "Thiếu semester hoặc major"
      });
    }

    const subjects = await subjectModel.find({
      semester: semester,
      majorId: new mongoose.Types.ObjectId(major as string)
    });
    console.log(subjects);
    
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy môn học cho kỳ học này",
        data: []
      });
    }

    return res.status(200).json({
      message: "Thành công",
      data: subjects
    });

  } catch (error: any) {
    console.error("Lỗi server:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message
    });
  }
};



// Xóa subject
const deleteSubject = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleted = await subjectModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy subject" });

        res.status(200).json({ message: "Xóa thành công" });

    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
export { getSubjectEqualMajor, getSubjectDetail, newSubject, deleteSubject, editSubject,findSubjectBySemester ,getByMajorId}
