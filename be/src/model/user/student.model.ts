import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    accountId:{
        type:String,
        required:true,
        unique:true,
        ref:"accounts"
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        default:""
    },
    dateOfBird:{
        type:Date,
    },
    parentPhone:{
        type:String,
    },
    parentName:{
        type:String,
    },
    status:{
        type:Boolean
    },
    major:{
        type:String,
        default:""
    },
    yearOfAdmission:{
        type:Number
    }
})
const StudentModel = mongoose.model("students",studentSchema);
export default StudentModel;
