import express from "express";
import { getQueryTeacher, updateTeacher } from '../../controller/user/teacher.controller.ts';

const teacherRouter = express.Router()

teacherRouter.get("/", getQueryTeacher)

teacherRouter.patch("/update/:id", updateTeacher)

export default teacherRouter