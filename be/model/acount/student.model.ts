import * as mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
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
    phone:({
        type:String,
        require:true,
        unique:true
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
const studentModel = mongoose.models.students || mongoose.model("students",studentSchema);
export default studentModel;