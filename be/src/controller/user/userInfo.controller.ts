import * as express from "express";
import accountModel from "../../model/acount/acount.model.ts";
import StudentModel from "../../model/user/student.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";

const getInfoDetail = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params
        const selected = await accountModel.findById(id)

        if (!selected) {
            return res.status(404).json({
                message: "Không tìm thấy thông tin người dùng"
            })
        }

        if (selected?.role === "student") {
            const data = await StudentModel.find({ accountId: id })
                .populate("accountId")
            return res.status(200).json({
                data: data,
                account: selected,
                message: "Thành công"
            })
        } else {
            const data = await TeacherModel.find({ accountId: id })
                .populate("accountId")
            return res.status(200).json({
                data: data,
                account: selected,
                message: "Thành công"
            })
        }

    } catch (error) {
        console.log("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getInfoDetail }