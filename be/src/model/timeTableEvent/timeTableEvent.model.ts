import e from "express";
import mongoose from "mongoose";
const eventTimeTableSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    },
    day:{
        type:Number,
        enum:[0,1,2,3,4,5,6]
    },            // 0 = Thứ 2 ... 6 = Chủ nhật
    section: String,        // "SÁNG" | "CHIỀU" | "TỐI"
    period: String,         // Tiết: "1-1", "7-8", "11-12"
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers"
    },
    semester:{
        type:String
    },
    room: String,           // Phòng
    type: {
        type: String,
        enum: ["study", "exam"]
    },
    note: String,
    startDate: Date,        // Dành cho lịch nhiều tuần
    endDate: Date,
}
    ,
    {
        timestamps: true

    })
const EventModel = mongoose.model("eventTimeTables", eventTimeTableSchema)
export default EventModel