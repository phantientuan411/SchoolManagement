import express from "express";
import { getQueryStudent, test } from "../../controller/user/student.controller.ts";
const studetnRouter = express.Router();
studetnRouter.get('/test', test);

studetnRouter.get('/', getQueryStudent)
export default studetnRouter;
