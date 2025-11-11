import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import AccountModel from "../model/acount/acount.model.ts";
import StudentModel from "../model/user/student.model.ts";
import TeacherModel from "../model/user/teacher.model.ts";
import StaffModel from "../model/user/staff.model.ts";
import { log } from "node:console";

const protectRouter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Không có token" });

    // đồng bộ
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    const accountId = decodedUser.accountId as string;
    if (!accountId) return res.status(403).json({ message: "Token không hợp lệ" });

    const account = await AccountModel.findOne({ _id:accountId }).select("-accountPassword").lean().exec();
    if (!account) return res.status(404).json({ message: "Tài khoản không tồn tại" });

    req.user = account;
    next();
  } catch (error: any) {
    console.error("Lỗi xác thực", error);
    return res.status(403).json({ message: error.message || "Token không hợp lệ" });
  }
};
export default protectRouter;