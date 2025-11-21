import express, { type Application, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { connectDB } from "./lib/db.ts";
//router
import authRouter from "./router/account/account.router.ts";
import studetnRouter from "./router/user/student.router.ts";
import protectRouter from "./middlewares/authMiddleWare.ts";
import getRouter from "./router/account/inform.router.ts";
import postRouter from "./router/homepage/post.router.ts";
import teacherRouter from "./router/user/teacher.router.ts";
import userInfoRouter from "./router/user/userInfo.router.ts";
import classMajorRouter from "./router/major/classmajor.router.ts";
import classstudentRouter from "./router/major/classstudent.router.ts";
import majorRouter from "./router/major/major.router.ts";
import classStudyRouter from "./router/major/classstudy.router.ts";


dotenv.config();
dotenv.config({ path: ".env.local" });

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
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
app.use("/api/major", majorRouter)
app.use("/api/classstudy", classStudyRouter)



const host = process.env.host || "localhost";
const port: number = parseInt(process.env.port || "3000", 10);
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