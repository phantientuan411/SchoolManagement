import * as express from "express"
import classstudyModel from "../../model/major/classstudies.model.ts"
import subjectModel from "../../model/major/subject.model.ts"
import TeacherModel from "../../model/user/teacher.model.ts"

const getClassStudy = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params

        const teacher = await TeacherModel.find({ accountId: id })

        if (!teacher) {
            res.status(404).json({ message: " Không tìm thấy giáo viên" })
        }

        const classStudy = await classstudyModel.find({ teacherId: teacher[0]?._id })
            .populate("teacherId")
            .populate("subjectId")

        const total = await classstudyModel.countDocuments({ teacherId: teacher[0]?._id })

        res.status(200).json({
            data: classStudy,
            totalClass: total,
            message: "Thành công"
        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getClassStudy }