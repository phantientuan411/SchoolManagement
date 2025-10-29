import * as express from 'express'; 
import { Application, Request, Response } from 'express'; 

import * as cookieParser from 'cookie-parser'; // ĐÃ SỬA
import * as cors from 'cors'; // ĐÃ SỬA
import * as mongoose from 'mongoose';
import { createServer } from "http";
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({
    path: ".env.local"
});

const app: Application = express.default(); 

app.use(express.json());

app.use(cookieParser.default()); 
app.use(cors.default({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

const host = process.env.host || 'localhost';
const port :number = parseInt(process.env.port || '3000' ,10);
const httpServer = createServer(app);

mongoose
.connect(process.env.url || 'mongodb://localhost:27017/my_school_db')
.then((res) => {
    httpServer.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
})
.catch((err) => {
    console.log(err);
});