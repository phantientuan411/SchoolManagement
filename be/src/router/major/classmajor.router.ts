import express from "express"
import { getAllClassMajor, getClassMajorEqualStudent } from "../../controller/major/classmajor.controller.ts"

const classMajorRouter = express.Router()

classMajorRouter.get("/", getClassMajorEqualStudent)
classMajorRouter.get("/all", getAllClassMajor)

export default classMajorRouter