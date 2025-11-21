import express from "express"
import { getClassStudy } from "../../controller/major/classstudy.controller.ts"

const classStudyRouter = express.Router()

classStudyRouter.get("/teacher/:id", getClassStudy)

export default classStudyRouter