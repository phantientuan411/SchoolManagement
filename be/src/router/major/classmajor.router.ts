import express from "express"
import { deleteClassMajor, editClassMajor, getAllClassMajor, getClassMajorDetail, getClassMajorEqualStudent, newClassMajor } from "../../controller/major/classmajor.controller.ts"

const classMajorRouter = express.Router()

classMajorRouter.get("/", getClassMajorEqualStudent)

classMajorRouter.get("/all", getAllClassMajor)

classMajorRouter.get("/:id", getClassMajorDetail)

classMajorRouter.post("/", newClassMajor)

classMajorRouter.patch("/:id", editClassMajor)

classMajorRouter.delete("/:id", deleteClassMajor)

export default classMajorRouter