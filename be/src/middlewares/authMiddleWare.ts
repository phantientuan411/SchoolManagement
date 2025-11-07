import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import AccountModel from "../model/acount/acount.model.ts";
import StudentModel from "../model/user/student.model.ts";
import TeacherModel from "../model/user/teacher.model.ts";
import StaffModel from "../model/user/staff.model.ts";

const protectRouter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "không có token"
            })
        };
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string,
            async (err, decodedUser) => {
                if (err || !decodedUser) {
                    console.error('lỗi xác thực', err);
                    return res.status(403).json({
                        message: "không có token"
                    })
                }

                const accountId = (decodedUser as JwtPayload).accountId as string | undefined;
                if (!accountId) {
                    return res.status(403).json({
                        message: "Token không hợp lệ"
                    })
                }
                const account = await (AccountModel as any).findOne({ accountId }).select("-accountPassword").lean().exec();
                if (!account) {
                    return res.status(404).json({
                        message: "tài khoản không tồn tại"
                    })
                }
                let userInfo;
                if (account.role === 'student') {
                    const student = await StudentModel.findOne({ accountId }).populate('classId').populate("major");
                    userInfo = student
                }
                if (account.role === 'teacher') {
                    const teacher = await TeacherModel.findOne({ accountId });
                    userInfo = teacher
                }
                if (account.role === 'staff') {
                    const staff = await StaffModel.findOne({ accountId });
                    userInfo = staff
                }
                req.user = userInfo;
                next();
            })
    } catch (error) {
        console.error('lỗi xác thực', error);
        return res.status(500).json({
            message: "lỗi hệ thống"
        })
    }
}
export default protectRouter;