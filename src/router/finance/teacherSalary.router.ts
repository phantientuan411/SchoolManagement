import express from "express";
import { getQueryTeacherSalary } from "../../controller/finance/teacherSalary.controller.ts";

const teacherSalaryRouter = express.Router();

teacherSalaryRouter.get("/", getQueryTeacherSalary);

export default teacherSalaryRouter;
