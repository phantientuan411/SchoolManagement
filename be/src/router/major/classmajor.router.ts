import express from "express"
import { getClassMajorEqualStudent } from "../../controller/major/classmajor.controller.ts"

const classMajorRouter = express.Router()

classMajorRouter.get("/", getClassMajorEqualStudent)

export default classMajorRouter