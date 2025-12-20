import * as express from "express";
import ExpenseModel from "../../model/finance/expense.ts";


interface ExpenseQuery {
    pageIdExpense: string;
    pageSizeExpense: string;
}

const getQueryExpense = async (
    req: express.Request<{}, {}, {}, ExpenseQuery>,
    res: express.Response
) => {
    try {
        const pageId = parseInt(req.query.pageIdExpense)
        const pageSize = parseInt(req.query.pageSizeExpense)

        let query = {}

        const startItem = (pageId - 1) * pageSize;

        const totalExpense = await ExpenseModel.countDocuments(query);

        const totalPageExpense = Math.ceil(totalExpense / pageSize);

        const data = await ExpenseModel.find(query)
            .skip(startItem)
            .limit(pageSize);

        const totalAmountExpense = await ExpenseModel.aggregate([
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
        ]);

        res.status(200).json({
            data,
            totalAmountExpense,
            totalPageExpense,
            totalExpense,
            message: "Thành công"
        });

    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export { getQueryExpense };
