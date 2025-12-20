import express from "express";
import { getAllMajor, getMajorDetails } from "../../controller/major/major.controller.ts";

const majorRouter = express.Router()

majorRouter.get("/", getAllMajor)

majorRouter.get("/:id", getMajorDetails)

export default majorRouter