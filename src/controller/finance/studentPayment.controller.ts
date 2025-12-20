import * as express from "express";
import StudentPaymentModel from "../../model/finance/studentPayment.ts";
import StudentModel from "../../model/user/student.model.ts";

// Định nghĩa kiểu dữ liệu query
interface StudentPaymentQuery {
    pageIdStudent: string;
    pageSizeStudent: string;
}

const getQueryStudentPayment = async (
    req: express.Request<{}, {}, {}, StudentPaymentQuery>,
    res: express.Response
) => {
    try {
        const pageIdStudent = Number(req.query.pageIdStudent) || 1;
        const pageSizeStudent = Number(req.query.pageSizeStudent) || 10;

        let query = {}

        // Phân trang, tổng số trang
        const startItem = (pageIdStudent - 1) * pageSizeStudent;
        const totalPayment = await StudentPaymentModel.countDocuments(query);
        const totalPageStudent = Math.ceil(totalPayment / pageSizeStudent);

        // Lấy dữ liệu
        const payments = await StudentPaymentModel.find(query)
            .skip(startItem)
            .limit(pageSizeStudent)
            .populate("studentId"); // nếu muốn lấy thông tin student

        const totalAmountPayment = await StudentPaymentModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        res.status(200).json({
            data: payments,
            totalPageStudent: totalPageStudent,
            totalStudent: totalPayment,
            totalAmountPayment: totalAmountPayment,
            message: "Thành công"
        });

    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({
            message: "Lỗi hệ thống"
        });
    }
};

export { getQueryStudentPayment };
