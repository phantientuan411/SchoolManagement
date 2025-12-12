
import * as express from "express";
import classstudentModel from "../../model/major/classstudent.ts";
import StudentModel from "../../model/user/student.model.ts";
import classstudyModel from '../../model/major/classstudies.model.ts';

interface Student {
    _id: string;
    accountId: string;
    classId: string
    name: string;
    address: string;
    gender: string
    parentPhone: string;
    parentName: string;
    status: boolean;
    major: string;
    yearOfAdmission: number;
    dateOfBirth: string;
}

interface Mark {
    regular: string
    final: string
    total: string
}

interface UpdateScore {
    _id: string
    mark: Mark
    classStudyId: string
    status: string
    studentId: Student
}


const getClassEqualStudent = async (req: express.Request<{}, {}, {}, { selected: string }>, res: express.Response) => {
    try {
        const { selected } = req.query

        const student = await StudentModel.find({ accountId: selected })

        if (student.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy account"
            })
        }

        const studentId = student[0]?._id

        const data = await classstudentModel.find({ studentId: studentId })
            .populate({
                path: "classStudyId",
                populate: [
                    {
                        path: "teacherId"
                    },
                    {
                        path: "subjectId"
                    }
                ]

            })

        if (!data) {
            return res.status(404).json({
                massage: "Không tìm thấy thông tin lớp học sinh"
            })
        }

        const pass = await classstudentModel.find({ studentId: studentId, status: "Pass" })
            .populate({
                path: "classStudyId",
                populate: [
                    {
                        path: "subjectId"
                    }
                ]

            })

        const total = await classstudentModel.countDocuments({ studentId: studentId, })
        const totalPass = await classstudentModel.countDocuments({ studentId: studentId, status: "Pass" })
        const totalFail = await classstudentModel.countDocuments({ studentId: studentId, status: "Fail" })
        const totalStudying = await classstudentModel.countDocuments({ studentId: studentId, status: "Studying" })

        res.status(200).json({
            total: total,
            totalFail: totalFail,
            totalPass: totalPass,
            totalStudying: totalStudying,
            pass: pass,
            data: data,
            message: "Thành công"
        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}


const updateScore = async (req: express.Request<{}, {}, UpdateScore[], {}>, res: express.Response) => {
    try {
        const updateScore = req.body

        for (const s of updateScore) {
            await classstudentModel.findByIdAndUpdate(
                s._id,
                {
                    "mark.regular": s.mark.regular,
                    "mark.final": s.mark.final,
                    "mark.total": s.mark.total
                },
                { new: true }
            )
        }

        res.status(200).json({ message: "Cập nhật điểm thành công" })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}


export { getClassEqualStudent, updateScore }