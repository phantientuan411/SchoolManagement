import express from "express";
import { getQueryStudent, test, updateInfoStudent } from "../../controller/user/student.controller.ts";
const studetnRouter = express.Router();
studetnRouter.get('/test', test);

studetnRouter.get('/', getQueryStudent)

studetnRouter.patch('/update/:id', updateInfoStudent)
export default studetnRouter;
