import * as express from "express"
import classstudyModel from "../../model/major/classstudies.model.ts"
import TeacherModel from "../../model/user/teacher.model.ts"

// Định nghĩa kiểu dữ liệu edit
interface EditClassStudy {
    classCode: string
    teacherId: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    dateOfWeek: string
}

// Định nghĩa kiểu dữ liệu thêm mới
interface NewClassStudy {
    classCode: string
    teacherId: string
    subjectId: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    dateOfWeek: string
}

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

const getClassStudyEqualSubject = async (req: express.Request<{}, {}, {}, { subjectId: string }>, res: express.Response) => {
    try {
        const { subjectId } = req.query

        const classStudy = await classstudyModel.find({ subjectId: subjectId })
            .populate("teacherId")
            .populate("subjectId")

        const total = await classstudyModel.countDocuments({ subjectId: subjectId })

        if (!classStudy) {
            return res.status(404).json({ message: "Không tìm thấy lớp học" })
        }

        res.status(200).json({
            data: classStudy,
            total: total,
            subjectId: subjectId,
            message: "Thành công"
        })
    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const deleteClassStudy = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params

        const deleted = await classstudyModel.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy ClassStudy" })
        }

        res.status(200).json({ message: "Xóa thành công" })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const editClassStudy = async (req: express.Request<{ id: string }, {}, { editClassStudy: EditClassStudy }, {}>, res: express.Response) => {
    try {
        const { editClassStudy } = req.body
        const { id } = req.params

        const updateClass = await classstudyModel.findByIdAndUpdate(id, editClassStudy, { new: true })

        if (!updateClass) {
            return res.status(404).json({ message: "Không tìm thấy ClassStudy" })
        }

        res.status(200).json({ message: "Update thành công" })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const newClassStudy = async (req: express.Request<{}, {}, { newClassStudy: NewClassStudy }, {}>, res: express.Response) => {
    try {
        const { newClassStudy } = req.body

        const createClass = await classstudyModel.create(newClassStudy)

        res.status(201).json({ message: "Thêm mới thành công" })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getClassStudy, getClassStudyEqualSubject, deleteClassStudy, editClassStudy, newClassStudy }