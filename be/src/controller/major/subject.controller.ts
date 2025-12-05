import subjectModel from '../../model/major/subject.model.ts';
import * as express from "express"

const getSubjectEqualMajor = async (req: express.Request<{}, {}, {}, { majorId: string }>, res: express.Response) => {
    try {

        const { majorId } = req.query

        const subject = await subjectModel.find({ majorId: majorId })

        const total = await subjectModel.countDocuments({ majorId: majorId })

        if (!subject) {
            return res.status(404).json({ message: "Không tìm thấy môn học" })
        }

        res.status(200).json({
            data: subject,
            total: total,
            majorId: majorId,
            message: "Thành công"
        })

    } catch (error) {
        console.error("Lỗi chi tiết:", error)
        res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const getByMajorId = async(req:express.Request<{}, {}, {}, {majorId:string}>, res:express.Response)=>{
    const id = req.params;
    console.log(id);
    
    const subject = await subjectModel.find({majorId:id})
    if(!subject){
        return res.status(404).json({message:"Không tìm thấy môn học"})
    }
    res.status(200).json({
        data:subject,
        message:"Thành công"
    })
}

export { getSubjectEqualMajor, getByMajorId}