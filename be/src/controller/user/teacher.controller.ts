import * as express from "express";
import TeacherModel from "../../model/user/teacher.model.ts";

// Định nghĩa kiểu dữ liệu query
interface TeacherQuery {
    pageId: string,
    pageSize: string,
    searchName?: string;
    major: string
}

// Định nghĩa kiểu dữ liệu update
interface UpdateTeacher {
    name: string;
    address: string;
    gender: string;
    status: boolean;
    dateOfBirth: string;
    degree: string;
    yearOfExperience: string;

}

const getQueryTeacher = async (req: express.Request<{}, {}, {}, TeacherQuery>, res: express.Response) => {
    try {
        const pageId = parseInt(req.query.pageId)
        const pageSize = parseInt(req.query.pageSize)
        const { searchName, major } = req.query

        let query = {}

        // Search
        if (searchName) {
            query = {
                name: {
                    $regex: searchName,
                    $options: "i"
                }
            }
        }

        // Sort major
        if (major) {
            query = {
                ...query,
                major: major
            }
        }

        // Phân trang, tổng trang
        const startItem = (pageId - 1) * pageSize
        const totalTeacher = await TeacherModel.countDocuments(query)
        const totalPage = Math.ceil(totalTeacher / pageSize)

        // Lấy dữ liệu
        const data = await TeacherModel.find(query)
            .populate("accountId")
            .skip(startItem)
            .limit(pageSize)

        res.status(200).json({
            data: data,
            totalPage: totalPage,
            totalTeacher: totalTeacher,
            message: "Thành công"
        })



    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const updateTeacher = async (req: express.Request<{ id: string }, {}, UpdateTeacher, {}>, res: express.Response) => {
    try {
        const { id } = req.params
        const updateTeacher = req.body

        const teacher = await TeacherModel.find({ accountId: id })
        console.log(teacher)
        const teacherId = teacher[0]?._id


        const updatedTeacher = await TeacherModel.findByIdAndUpdate(
            teacherId,
            updateTeacher,
            { new: true }
        )

        if (!updateTeacher) {
            return res.status(404).json({ message: "Không tìm thấy giáo viên" })
        }

        res.status(200).json({
            data: updatedTeacher,
            message: "Cập nhật giáo viên thành công"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export { getQueryTeacher, updateTeacher }