import * as express from "express";
import * as bcrypt from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";
import AccountModel from "../../model/acount/acount.model.ts";
import StudentModel from "../../model/user/student.model.ts";
import TeacherModel from "../../model/user/teacher.model.ts";
import StaffModel from "../../model/user/staff.model.ts";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import SessionModel from "../../model/session.ts";
const signup = async (req: express.Request, res: express.Response) => {
    try {
        const { accountName, accountEmail, accountPassword, role } = req.body;
        if (!accountName || !accountEmail || !accountPassword || !role) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const checkAccount = await AccountModel.findOne({ accountEmail });
        if (checkAccount) {
            return res.status(409).json({
                message: "Email đã tồn tại"
            })
        }
        const hashPassword = await bcrypt.hash(accountPassword, 10);
        let accountId = uuidv4();
        while (await AccountModel.findOne({ accountId })) {
            accountId = uuidv4();
        }
        await AccountModel.create({
            accountName,
            accountEmail,
            accountPassword: hashPassword,
            accountId,
            isActive: true,
            role
        })
        console.log(role);
        
        if (role === 'student'){
            try {
                await StudentModel.create({
                accountId,
                name: accountName,
                address:"",
                gender:"",
                dateOfBird:"",
                parentPhone:"",
                parentName:"",
                major:"",
                status:true,
                yearOfAdmission:""

            })
            } catch (error) {
              return res.status(500).json({
                    message: "Lỗi hệ thống"
                }) 
            }
        }else if (role == 'teacher'){
             try {
                await TeacherModel.create({
                accountId ,
                name: accountName,
                address:"",
                gender:"",
                dateOfBird:"",
                degree:"",
                major:"",
                yearExperience:"",
                status:true})
             } catch (error) {
                console.log('Lỗi khi đăng ký', error);
                return res.status(500).json({
                    message: "Lỗi hệ thống"
                })
             }
        
        }else if (role == 'staff'){
            try {
                await StaffModel.create({
                accountId,
                name: accountName,
                address:"",
                gender:"",
                profession:"",
                year:"",
                status:true
            })
            } catch (error) {
              return res.status(500).json({
                    message: "Lỗi hệ thống"
                })  
            }
        }
        return res.status(200).json({
            message: `Đăng ký thành công cho ${role}`
        })
    } catch (error) {
        console.log('Lỗi khi đăng ký', error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
const login = async (req: express.Request, res: express.Response) => {
    const ACCESS_TOKEN_EXPIRES = '30m'
    const REFRESS_TOKEN_EXPIRES = 30 * 24 * 60 * 60 *1000
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        console.log(email,password);
        
        //kiem tra mk
        const checkAccount = await (AccountModel as any).findOne({ accountEmail: email});
        if (!checkAccount) {
            return res.status(400).send({
                data: [],
                message: "email hoặc mật khẩu không khớp"
            });
        }
        const checkPassword = await bcrypt.compare(password, checkAccount.accountPassword);
        if (!checkPassword) {
            return res.status(400).json({
                message: "email hoặc mật khẩu không khớp"
            })
        }
        //tao access token
        const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
        const accountId = checkAccount.accountId                                                       ;
        if (!accessSecret) {
            return res.status(500).json({ message: "missing ACCESS_TOKEN_SECRET" });
        }
        const accessToken = jwt.sign(
            { accountId },
            accessSecret,
            { expiresIn: ACCESS_TOKEN_EXPIRES || '15m' }
        );
        //tao refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex');
        await SessionModel.create({
            userId: checkAccount._id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: REFRESS_TOKEN_EXPIRES,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).json({
            message: "Đăng nhập thành công",
            data: {
                accessToken,
                refreshToken
            }
        });


    } catch (error) {
        console.log('Lỗi khi đăng nhập', error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
};
const logout = async (req: express.Request, res: express.Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            await SessionModel.deleteOne({refreshToken});
            res.clearCookie('refreshToken');
            return res.status(200).json({message:'Đăng xuất thành công'})
        }
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        }
        );
    }
}
export { signup, login, logout };