import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    accountId:({
        type:String,
        require:true,
        unique:true,
        ref:"accounts"
    }),
    name:({
        type:String,
        require:true
    }),
    address:({
        type:String,
        require:true
    }),
    gender:({
        type:String,
        enum:["male","female"]
    }),
    dateOfBird:({
        type:Date,
    }),
    parentPhone:({
        type:String,
    }),
    parentName:({
        type:String,
    }),
    status:({
        type:Boolean
    }),
    major:({
        type:String,
        require:true
    }),
    yearOfAdmission:({
        type:Number
    })
})
const StudentModel = mongoose.models.students || mongoose.model("students",studentSchema);
export default StudentModel;