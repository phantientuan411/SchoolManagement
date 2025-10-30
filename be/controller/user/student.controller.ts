import StudentModel from "../../model/user/student.model.js";
import { Request, Response } from "express";
const test = async (req: Request, res: Response) => {
    res.status(200).json({
        message: "hello"
    })

}
export{test}