import mongoose from 'mongoose';
const staffSchema = new mongoose.Schema({
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
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profession:{
        type:String,
        enum:["chef","guar","labor"]
    },
    year:{
        type:Number
    },
    status:{
        type:Boolean
    }


})
const StaffModel = mongoose.model("staffs",staffSchema);
export default StaffModel;