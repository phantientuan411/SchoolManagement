import express from "express";
import { getQueryTeacher } from '../../controller/user/teacher.controller.ts';

const teacherRouter = express.Router()

teacherRouter.get("/", getQueryTeacher)

export default teacherRouter