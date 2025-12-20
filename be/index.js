import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { connectDB } from "./src/lib/db.ts";
//router
import authRouter from "./src/router/account/account.router.ts";
import studetnRouter from "./src/router/user/student.router.ts";
import protectRouter from "./src/middlewares/authMiddleWare.ts";
import getRouter from "./src/router/account/inform.router.ts";
import postRouter from "./src/router/homepage/post.router.ts";
import teacherRouter from "./src/router/user/teacher.router.ts";
import userInfoRouter from "./src/router/user/userInfo.router.ts";
import classMajorRouter from "./src/router/major/classmajor.router.ts";
import classstudentRouter from "./src/router/major/classstudent.router.ts";
import majorRouter from "./src/router/major/major.router.ts";
import classStudyRouter from "./src/router/major/classstudy.router.ts";
import subjectRouter from "./src/router/major/subject.router.ts";
import timeTableRoute from "./src/router/timeTable/timeTable.router.ts";
import investmentRouter from "./src/router/finance/investment.router.ts";
import studentPaymentRouter from "./src/router/finance/studentPayment.router.ts";
import teacherSalaryRouter from "./src/router/finance/teacherSalary.router.ts";
import classDeviceRouter from "./src/router/class/classDevice.router.ts";
import classRoomRouter from "./src/router/class/classRoom.router.ts";
import expenseRouter from "./src/router/finance/expense.router.ts";

dotenv.config();
dotenv.config({ path: ".env.local" });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

//router public
app.use("/api/account", authRouter);
app.use('/api', getRouter);
//router private
app.use(protectRouter);
app.use("/api/student", studetnRouter);
app.use("/api/post", postRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/userinfo", userInfoRouter);
app.use("/api/classmajor", classMajorRouter);
app.use("/api/classstudent", classstudentRouter);
app.use("/api/major", majorRouter);
app.use("/api/classstudy", classStudyRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/timeTable", timeTableRoute);
app.use("/api/investment", investmentRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/studentPayment", studentPaymentRouter)
app.use("/api/teacherSalary", teacherSalaryRouter)
app.use("/api/classDevice", classDeviceRouter)
app.use("/api/classRoom", classRoomRouter)

const host = process.env.host || "localhost";
const port = parseInt(process.env.port || "3000", 10);
const httpServer = createServer(app);

connectDB()
  .then(() => {
    httpServer.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Lỗi kết nối DB:", err);
  });