import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
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