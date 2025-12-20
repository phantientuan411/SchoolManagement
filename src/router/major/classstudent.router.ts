import express from "express";
import { getClassEqualStudent, updateScore } from "../../controller/major/classstudent.controller.ts";

const classstudentRouter = express.Router()

classstudentRouter.get("/student", getClassEqualStudent)

classstudentRouter.patch("/updatemany", updateScore)

export default classstudentRouter