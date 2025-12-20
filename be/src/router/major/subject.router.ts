import express from "express"
import { getSubjectEqualMajor,getByMajorId,findSubjectBySemester,getSubjectDetail,newSubject,editSubject,deleteSubject } from "../../controller/major/subject.controller.ts"

const subjectRouter = express.Router()

subjectRouter.get("/major", getSubjectEqualMajor)
subjectRouter.get("/majorId/:majorId", getByMajorId)
subjectRouter.get("/:id", getSubjectDetail)

subjectRouter.post("/", newSubject);
subjectRouter.post("/semester",findSubjectBySemester);
subjectRouter.patch("/:id", editSubject);

subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter