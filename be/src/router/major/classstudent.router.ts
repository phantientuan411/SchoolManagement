import express from "express";
import { getClassEqualStudent } from "../../controller/major/classstudent.controller.ts";

const classstudentRouter = express.Router()

classstudentRouter.get("/student", getClassEqualStudent)

export default classstudentRouter