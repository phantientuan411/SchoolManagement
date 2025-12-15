import * as express from "express";
import TeacherSalaryModel from "../../model/finance/teacherSalary.ts";
import TeacherModel from "../../model/user/teacher.model.ts";

// Định nghĩa kiểu dữ liệu query
interface TeacherSalaryQuery {
    pageIdTeacher: string;
    pageSizeTeacher: string;
}

const getQueryTeacherSalary = async (
    req: express.Request<{}, {}, {}, TeacherSalaryQuery>,
    res: express.Response
) => {
    try {
        const pageIdTeacher = parseInt(req.query.pageIdTeacher);
        const pageSizeTeacher = parseInt(req.query.pageSizeTeacher);

        const query = {}; // Có thể thêm filter sau này

        // Phân trang
        const startItem = (pageIdTeacher - 1) * pageSizeTeacher;
        const totalTeacher = await TeacherSalaryModel.countDocuments(query);
        const totalPageTeacher = Math.ceil(totalTeacher / pageSizeTeacher);

        // Lấy dữ liệu
        const salaries = await TeacherSalaryModel.find(query)
            .skip(startItem)
            .limit(pageSizeTeacher)
            .populate("teacherId"); // Nếu muốn hiển thị thông tin giáo viên

        const totalAmountTeacher = await TeacherSalaryModel.aggregate([
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year"
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    totalAmount: 1
                }
            }
        ])

        res.status(200).json({
            data: salaries,
            totalPageTeacher: totalPageTeacher,
            totalTeacher: totalTeacher,
            totalAmountTeacher: totalAmountTeacher,
            message: "Thành công",
        });
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({
            message: "Lỗi hệ thống",
        });
    }
};

export { getQueryTeacherSalary };
