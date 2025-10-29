import * as mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
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
    degree:({
        type:String,
    }),
    major:({
        type:String,
    }),
    yearExperience:({
        type:String
    }),
    status:({
        type:Boolean
    })
})
const teacherModel = mongoose.models.teachers || mongoose.model("teachers",teacherSchema);
export default teacherModel;