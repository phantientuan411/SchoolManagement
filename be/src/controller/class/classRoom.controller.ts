import ClassRoomModel from "../../model/class/classRoom.model.ts";
import  express  from "express";
interface ClassRoomQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
}
interface UpdateClassRoom {
    roomId: string ;
    roomType: string ;
    possition: string ;
    capacity: number ;
    status: boolean;
}
interface classRoom {
    roomId: string ;
    roomType: string ;
    possition: string ;
    capacity: number ;
    status: boolean;
}
const getAllClassRoom=async(req:express.Request<{}, {}, {}, ClassRoomQuery>,res:express.Response)=>{
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
        const startItem = (pageId-1)*pageSize
        const totalClassRoom=await ClassRoomModel.countDocuments(query)
        const totalPage=Math.ceil(totalClassRoom/pageSize)
        const getClassRoom = await ClassRoomModel.find(query)
            .skip(startItem)
            .limit(pageSize)
        
        if (getClassRoom.length===0) {
            return res.status(404).json({
                message: "không có lớp học nào"
            })
        }
        return res.status(200).json({
            data: getClassRoom,
            totalPage: totalPage,
            totalClassRoom: totalClassRoom,
            message: "Thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    
    }
}
const findClass=async(req:express.Request<{id:string}, {}, {}, {}>,res:express.Response)=>{
    try {
        const id=req.params;
        const ClassRoom = await ClassRoomModel.findById(id)
        if(!ClassRoom){
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        return res.status(200).json({
            data: ClassRoom,
            message: "Thành công"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    
    }
}
const updateClassRoom=async(req:express.Request<{id:string}, {}, UpdateClassRoom, {}>,res:express.Response)=>{
    try {
        const newdata = req.body
        if(newdata.capacity <=0){
            return res.status(400).json({
                message: "Số lượng không hợp lệ"
            })
        }
        const id=req.params
        const ClassRoom = await ClassRoomModel.findById(id)
        if(!ClassRoom){
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        const updatedClassRoom = await ClassRoomModel.findByIdAndUpdate(
            newdata,
            { new: true }
        )
        return res.status(200).json({
            data: updatedClassRoom,
            message: "Cập nhật thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    
    }
}

const deleteClassRoom=async(req:express.Request<{id:string}, {}, {}, {}>,res:express.Response)=>{
    try {
        const id=req.params;
        const ClassRoom = await ClassRoomModel.findById(id)
        if(!ClassRoom){
            return res.status(404).json({
                message: "Không tìm thấy lớp học"
            })
        }
        await ClassRoomModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Xóa thành công"
        })
        } catch (error) {
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    
    }

}
export {getAllClassRoom,findClass,updateClassRoom,deleteClassRoom}