import express from "express"
import { getClassMajorEqualStudent } from "../../controller/major/classmajor.controller.ts"

const classMajorRouter = express.Router()

classMajorRouter.get("/student", getClassMajorEqualStudent)

export default classMajorRouter