import express from "express"
import { deleteClassStudy, editClassStudy, getClassStudy, getClassStudyEqualSubject, newClassStudy } from "../../controller/major/classstudy.controller.ts"

const classStudyRouter = express.Router()

classStudyRouter.get("/teacher/:id", getClassStudy)

classStudyRouter.get("/subject", getClassStudyEqualSubject)

classStudyRouter.delete("/:id", deleteClassStudy)

classStudyRouter.patch("/:id", editClassStudy)

classStudyRouter.post("/", newClassStudy)

export default classStudyRouter