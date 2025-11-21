import * as express from "express";
import StudentModel from "../../model/user/student.model.ts";
import classmajorModel from "../../model/major/classmajor.model.ts";
import accountModel from '../../model/acount/acount.model.ts';
import majorModel from "../../model/major/major.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";

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

export { getClassMajorEqualStudent, getAllClassMajor }