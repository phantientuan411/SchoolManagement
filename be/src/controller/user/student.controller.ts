import * as express from "express";
import StudentModel from "../../model/user/student.model.ts";


const test = async (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: "hello"
    })
}

// Định nghĩa kiểu dữ liệu Sort
interface SortQuery {
    [key: string]: 'asc' | 'desc' | ""
}

// Định nghĩa kiểu dữ liệu query
interface StudentQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
    sort: SortQuery | string
}

// Hàm parse SortQuery
const parseSortQuery = (sortObj: SortQuery): Record<string, 1 | -1> => {
    const result: Record<string, 1 | -1> = {}

    for (const key in sortObj) {
        const value = sortObj[key]
        if (value === "asc") result[key] = 1
        else if (value === "desc") result[key] = -1
    }

    return result
}

// Lấy danh sách học sinh theo query
const getQueryStudent = async (req: express.Request<{}, {}, {}, StudentQuery>, res: express.Response) => {
    try {
        const pageId = parseInt(req.query.pageId)
        const pageSize = parseInt(req.query.pageSize)
        const searchName = req.query.searchName

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

        // phân trang, tổng trang
        const startItem = (pageId - 1) * pageSize
        const totalStudent = await StudentModel.countDocuments(query)
        const totalPage = Math.ceil(totalStudent / pageSize)

        console.log("query", query)

        // Lấy dữ liệu 
        const getStudent = await StudentModel.find(query)
            .populate("classId")
            .skip(startItem)
            .limit(pageSize)
            .sort(parseSortQuery(JSON.parse(req.query.sort as string)))

        res.status(200).json({
            data: getStudent,
            totalPage: totalPage,
            totalStudent: totalStudent,
            message: "Thành công"

        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
export { test, getQueryStudent }