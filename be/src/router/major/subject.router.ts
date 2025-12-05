import express from "express"
import { getSubjectDetail, getSubjectEqualMajor, newSubject, editSubject, deleteSubject } from "../../controller/major/subject.controller.ts"

const subjectRouter = express.Router()

subjectRouter.get("/major", getSubjectEqualMajor)

subjectRouter.get("/:id", getSubjectDetail)

subjectRouter.post("/", newSubject);

subjectRouter.patch("/:id", editSubject);

subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter