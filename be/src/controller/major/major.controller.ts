import * as express from "express";
import majorModel from "../../model/major/major.model.ts";

const getAllMajor = async (req: express.Request<{}, {}, {}, {}>, res: express.Response) => {
    try {
        const major = await majorModel.find({})

        res.status(200).json({
            data: major,
            message: "Lấy dữ liệu major thành công"
        })

    } catch (error) {
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getAllMajor }