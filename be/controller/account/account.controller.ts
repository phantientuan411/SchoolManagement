import { Request, Response } from "express";
import * as bcrypt from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../../model/acount/acount.model.js";
import studentModel from "../../model/acount/student.model.js";
import teacherModel from "../../model/acount/teacher.model.js";
import staffModel from "../../model/acount/staff.model.js";

const signup = async (req: Request, res: Response) => {
    try {
        const { accountName, accountEmail, accountPassword,role} = req.body;
        if (!accountName || !accountEmail || !accountPassword || !role) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const checkAccount = await accountModel.findOne({ accountEmail });
        if (checkAccount) {
            return res.status(409).json({
                message: "Email đã tồn tại"
            })
        }
        const hashPassword = await bcrypt.hash(accountPassword, 10);
        let accountId = uuidv4();
        while (await accountModel.findOne({ accountId })) {
            accountId = uuidv4();
        }
        await accountModel.create({
            accountName,
            accountEmail,
            accountPassword: hashPassword,
            accountId,
            isActive: true,
            role
        })
        return res.status(200).json({
            message: "Đăng ký thành công"
        })
    } catch (error) {
        console.log('Lỗi khi đăng ký', error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const checkAccount = await accountModel.findOne({ email });
        if (checkAccount.lengt == 0) {
            res.status(400).send({
                data: [],
                message: "tài khoản không tồn tại"
            })
        };


    } catch (error) {

    }
};

export { signup, login };