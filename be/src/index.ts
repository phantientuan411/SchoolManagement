import express, {type Application,type Request,type Response } from "express";
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



dotenv.config();
dotenv.config({ path: ".env.local" });

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

//router public
app.use("/api/account", authRouter);

//router private
app.use(protectRouter);
app.use("/api/student", studetnRouter);
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