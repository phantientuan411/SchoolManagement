import ClassDeviceModel from "../../model/class/classDevice.model.ts";
import express from "express";
interface ClassDeviceQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
}
interface UpdateClassDevice {
    roomId: string;
    device: [device];
}
interface device {
    name: string;
    quantity: number;
    qualities: string;
    status: boolean;
}
const getAllClassDevice = async (req: express.Request<{}, {}, {}, ClassDeviceQuery>, res: express.Response) => {
    try {
        const pageId = parseInt(req.query.pageId)
        const pageSize = parseInt(req.query.pageSize)
        const searchName = req.query.searchName

        let query = {}

        if (searchName) {
            query = {
                roomId: {
                    $regex: searchName,
                    $options: "i"
                }
            }
        }
        const startItem = (pageId - 1) * pageSize
        const totalClassDevice = await ClassDeviceModel.countDocuments(query)
        const totalPage = Math.ceil(totalClassDevice / pageSize)
        const getClassDevice = await ClassDeviceModel.find(query)
            .skip(startItem)
            .limit(pageSize)
            .populate("roomId")
        if (getClassDevice.length === 0) {
            return res.status(404).json({
                message: "không có lớp học nào"
            })
        }
        return res.status(200).json({
            data: getClassDevice,
            totalPage: totalPage,
            totalClassDevice: totalClassDevice,
            message: "Thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const findClassDevice = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const id = req.params;
        const ClassDevice = await ClassDeviceModel.findById(id)
        if (!ClassDevice) {
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        return res.status(200).json({
            data: ClassDevice,
            message: "Thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const updateClassDevice = async (req: express.Request<{ id: string }, {}, UpdateClassDevice, {}>, res: express.Response) => {
    try {
        const id = req.params;
        const newdata = req.body;
        const ClassDevice = await ClassDeviceModel.findById(id);
        if (!ClassDevice) {
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        await ClassDeviceModel.findByIdAndUpdate(id, newdata);
        return res.status(200).json({
            message: "Cập nhật thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const deleteCls = async (req: express.Request<{ id: string }, {}, {}, {}>, res: express.Response) => {
    try {
        const id = req.params;
        const ClassDevice = await ClassDeviceModel.findById(id);
        if (!ClassDevice) {
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        await ClassDeviceModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xóa thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }

}
export { getAllClassDevice, findClassDevice, updateClassDevice, deleteCls }