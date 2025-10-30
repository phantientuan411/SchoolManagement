import express from "express";
import { test } from "../../controller/user/student.controller.js";
const studetnRouter = express.Router();

studetnRouter.get('/test',test)

export default studetnRouter;