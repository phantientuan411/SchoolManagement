import express from "express"
import { getClassMajorByMajor,deleteClassMajor, editClassMajor, getAllClassMajor, getClassMajorDetail, getClassMajorEqualStudent, newClassMajor } from "../../controller/major/classmajor.controller.ts"

const classMajorRouter = express.Router()

classMajorRouter.get("/", getClassMajorEqualStudent)

classMajorRouter.get("/all", getAllClassMajor)

classMajorRouter.get("/:id", getClassMajorDetail)
classMajorRouter.get("/major", getClassMajorByMajor)
classMajorRouter.post("/", newClassMajor)

classMajorRouter.patch("/:id", editClassMajor)

classMajorRouter.delete("/:id", deleteClassMajor)

export default classMajorRouter