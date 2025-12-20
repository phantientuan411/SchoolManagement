import * as express from "express";
import majorModel from "../../model/major/major.model.ts";
import mongoose from "mongoose";

const getAllMajor = async (req: express.Request<{}, {}, {}, {}>, res: express.Response) => {
    try {
        const major = await majorModel.aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "major",
                    as: "students"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "majorCode",
                    foreignField: "major",
                    as: "teachers"
                }
            },
            {
                $lookup: {
                    from: "classmajors",
                    localField: "_id",
                    foreignField: "majorId",
                    as: "classMajors"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "_id",
                    foreignField: "majorId",
                    as: "subjects"
                }
            }
        ])

        const total = await majorModel.countDocuments({})

        res.status(200).json({
            data: major,
            total: total,
            message: "Lấy dữ liệu major thành công"
        })

    } catch (error) {
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

const getMajorDetails = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const { id } = req.params

        const majorDetails = await majorModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "major",
                    as: "students"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "majorCode",
                    foreignField: "major",
                    as: "teachers"
                }
            },
            {
                $lookup: {
                    from: "classmajors",
                    localField: "_id",
                    foreignField: "majorId",
                    as: "classMajors"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "_id",
                    foreignField: "majorId",
                    as: "subjects"
                }
            }
        ])

        const total = await majorModel.countDocuments({ _id: id })

        res.status(200).json({
            data: majorDetails,
            total: total,
            message: "Lấy dữ liệu major thành công"
        })

    } catch (error) {
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}

export { getAllMajor, getMajorDetails }