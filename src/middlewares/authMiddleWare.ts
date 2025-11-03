import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AccountModel from "../model/acount/acount.model.js";

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
                        message:"tài khoản không tồn tại"
                    })
                }
                req.user = account;
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