import express from "express";
import { test } from "../../controller/user/student.controller.ts";
const studetnRouter = express.Router();
studetnRouter.get('/test', test);
export default studetnRouter;
