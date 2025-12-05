import express from "express"
import { getSubjectEqualMajor,getByMajorId,getSubjectDetail,newSubject,editSubject,deleteSubject } from "../../controller/major/subject.controller.ts"

const subjectRouter = express.Router()

subjectRouter.get("/major", getSubjectEqualMajor)
subjectRouter.get("/majorId/:id", getByMajorId)
subjectRouter.get("/:id", getSubjectDetail)

subjectRouter.post("/", newSubject);

subjectRouter.patch("/:id", editSubject);

subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter