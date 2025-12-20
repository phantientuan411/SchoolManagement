import * as express from "express";
import StudentModel from "../../model/user/student.model.ts";
import classmajorModel from "../../model/major/classmajor.model.ts";
import accountModel from '../../model/acount/acount.model.ts';
import majorModel from "../../model/major/major.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";
import mongoose from "mongoose";

const getClassMajorEqualStudent = async (req: express.Request<{}, {}, {}, { selected: string }>, res: express.Response) => {
    try {
        const { selected } = req.query

        const account = await accountModel.findById(selected)

        if (!account) {
            return res.status(404).json({
                message: "Không tìm thấy tài khoản"
            })
        }

        if (account.role === "student") {
            const student = await StudentModel.find({ accountId: selected })
            const classMajor = await classmajorModel.find({ _id: student[0]?.classId })
                .populate("majorId")
                .populate("teacherId")
            return res.status(200).json({
                data: classMajor,
                massage: "Thành công"
            })
        }

        const teacher = await TeacherModel.find({ accountId: selected })
        const classMajor = await classmajorModel.find({ teacherId: teacher[0]?._id })
            .populate("majorId")
            .populate("teacherId")

        res.status(200).json({
            data: classMajor,
            message: "Thành công"

        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const getAllClassMajor = async (req: express.Request<{}, {}, {}, {}>, res: express.Response) => {
    try {
        const classMajor = await classmajorModel.find({})

        res.status(200).json({
            data: classMajor,
            message: "Thành công"
        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const getClassMajorByMajor = async (req: express.Request<{}, {}, {}, { majorId: string }>, res: express.Response) => {
    try {
        const { majorId } = req.query

        const classMajor = await classmajorModel.find({ majorId: majorId })
        if (classMajor.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy lớp cho chuyên ngành này"
            })
        }
        res.status(200).json({
            data: classMajor,
            message: "Thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const getClassMajorDetail = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params

        const classMajor = await classmajorModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "classId",
                    as: "student"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacher"
                }
            }
        ])

        res.status(200).json({
            data: classMajor,
            message: "Thành công"
        })
    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const newClassMajor = async (req: express.Request<{}, {}, {
    classCode: string;
    className: string;
    teacherId: string;
    majorId: string;
    year: number;
}>, res: express.Response) => {
    try {
        const { classCode, className, teacherId, majorId, year } = req.body;
        await classmajorModel.create({ classCode, className, teacherId, majorId, year });
        res.status(201).json({ message: "Thêm mới thành công" });
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

const editClassMajor = async (req: express.Request<{ id: string }, {}, {
    classCode: string;
    className: string;
    teacherId: string;
    year: number;
}>, res: express.Response) => {
    try {
        const { id } = req.params;
        const update = await classmajorModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) return res.status(404).json({ message: "Không tìm thấy ClassMajor" });
        res.status(200).json({ message: "Sửa thành công" });
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

const deleteClassMajor = async (req: express.Request<{ id: string }>, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleted = await classmajorModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy ClassMajor" });
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export { getClassMajorByMajor,getClassMajorEqualStudent, getAllClassMajor, getClassMajorDetail, newClassMajor, editClassMajor, deleteClassMajor }