import StudentModel from "../../model/user/student.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";
import protectRouter from "../../middlewares/authMiddleWare.ts";
import express from "express";
import accountModel from "../../model/acount/acount.model.ts";
import StaffModel from "../../model/user/staff.model.ts";
const getRouter = express.Router();

const getInform = async (req: express.Request, res: express.Response) => {
    try {
        const user = req.user;
        const{_id,role} = user;
        if (!user) {
            return res.status(404).json({
                message: "tài khoản không tồn tại"
            })
        }
        else if (user.role === 'admin') {
            const acountInform = await accountModel.findOne({ _id }).select("-accountPassword");
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }
        else if (user.role === 'student') { 
            const acountInform = await StudentModel.findOne({ accountId: _id})
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }
        else if (user.role === 'teacher') { 
            const acountInform = await TeacherModel.findOne({ accountId: _id})
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }
        else if (user.role === 'staff') { 
             const acountInform = await StaffModel.findOne({ accountId: _id})
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }


    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error,
    });
    }
}
getRouter.get("/me", protectRouter, getInform);
export default getRouter;