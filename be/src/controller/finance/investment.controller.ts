import * as express from "express";
import InvestmentModel from "../../model/finance/investment.ts";

// Định nghĩa kiểu dữ liệu query
interface InvestmentQuery {
    pageId: string;
    pageSize: string;
}

const getQueryInvestment = async (req: express.Request<{}, {}, {}, InvestmentQuery>, res: express.Response) => {
    try {
        const pageId = parseInt(req.query.pageId)
        const pageSize = parseInt(req.query.pageSize)

        let query = {}


        // phân trang, tổng trang
        const startItem = (pageId - 1) * pageSize
        const totalInvestment = await InvestmentModel.countDocuments(query)
        const totalPage = Math.ceil(totalInvestment / pageSize)

        console.log("query", query)

        // Lấy dữ liệu 
        const getInvestment = await InvestmentModel.find(query)
            .skip(startItem)
            .limit(pageSize)

        const totalAmountInvestment = await InvestmentModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])
        res.status(200).json({
            data: getInvestment,
            totalPage: totalPage,
            totalStudent: totalInvestment,
            totalAmountInvestment: totalAmountInvestment,
            message: "Thành công"

        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getQueryInvestment }