import express from "express";
import { getQueryStudentPayment } from "../../controller/finance/studentPayment.controller.ts";

const studentPaymentRouter = express.Router();

// Lấy danh sách student payments có phân trang
studentPaymentRouter.get("/", getQueryStudentPayment);

export default studentPaymentRouter;
