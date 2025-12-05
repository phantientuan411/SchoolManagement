import express from "express"
import { getSubjectEqualMajor } from "../../controller/major/subject.controller.ts"

const subjectRouter = express.Router()

subjectRouter.get("/major", getSubjectEqualMajor)
subjectRouter.get("/majorId/:id", getByMajorId)


export default subjectRouter