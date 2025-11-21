import express from "express";
import { getAllMajor } from "../../controller/major/major.controller.ts";

const majorRouter = express.Router()

majorRouter.get("/", getAllMajor)

export default majorRouter