import StudentModel from "../../model/user/student.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";
import protectRouter from "../../middlewares/authMiddleWare.ts";
import express from "express";
import accountModel from "../../model/acount/acount.model.ts";
import StaffModel from "../../model/user/staff.model.ts";
import jwt from "jsonwebtoken";
import SessionModel from "../../model/session.ts";
const getRouter = express.Router();

const getInform = async (req: express.Request, res: express.Response) => {
    try {
        const user = req.user;
        const { _id, role } = user;
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
            const acountInform = await StudentModel.findOne({ accountId: _id })
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }
        else if (user.role === 'teacher') {
            const acountInform = await TeacherModel.findOne({ accountId: _id })
            if (!acountInform) {
                return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
            return res.status(200).json({ role, acountInform });
        }
        else if (user.role === 'staff') {
            const acountInform = await StaffModel.findOne({ accountId: _id })
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
interface ST {
    userId: string,
    token: string,
    expiresAt: Date
}
const refreshAccess = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ message: "Không tìm thấy refresh token" });
    }    
    const sessions = await SessionModel.find({ token: refreshToken}).sort({ expiresAt: -1 });

    if (sessions.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy token" });
    }
    else{
      console.log(1);
    }

    if (sessions.length > 6) {
      const oldestSession = sessions[sessions.length - 1];
      if (oldestSession) await oldestSession.deleteOne();
    }

    const session = sessions[0];
    if(!session){
        return res.status(404).json({ message: "Không tìm thấy token" });
    }
    if (session.token !== refreshToken) {
      return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }
    else{
        console.log(1);
    }


    const accessToken = jwt.sign(
      { accountId: session.userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30m" }
    );

    return res.status(200).json({ accessToken });

  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

getRouter.get("/me", protectRouter, getInform);
getRouter.post("/refresh-token", refreshAccess);
export default getRouter;