import * as express from "express";
import StudentModel from "../../model/user/student.model.ts";
import classmajorModel from "../../model/major/classmajor.model.ts";

const getClassMajorEqualStudent = async (req: express.Request<{}, {}, {}, { selected: string }>, res: express.Response) => {
    try {
        const { selected } = req.query

        const student = await StudentModel.findById(selected)

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy học sinh"
            })
        }

        const classMajor = await classmajorModel.findById(student.classId)

        if (!classMajor) {
            return res.status(404).json({
                message: "Không tìm thấy lớp"
            })
        }

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

export { getClassMajorEqualStudent }