import express from "express"
import { getSubjectEqualMajor } from "../../controller/major/subject.controller.ts"

const subjectRouter = express.Router()

subjectRouter.get("/major", getSubjectEqualMajor)

export default subjectRouter