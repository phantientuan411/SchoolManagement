import { log } from "console";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/my_school_db");
        console.log("connect success");
    } catch (error) {
        console.log("connect fail",error);
        process.exit(1);        
    }
}