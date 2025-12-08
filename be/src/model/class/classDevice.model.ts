import mongoose from "mongoose";
const item = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    qualities:{
        type:String,
        required:true,
        enum:["good","degraded"]
    },
    status:{
        type:Boolean,
        required:true
    }
})

const ClDeviceSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classroom",
        required: true
    },
    device:{
        type:[item],
        required:true
    }
    
},
{
    timestamps:true
})
const ClassDeviceModel=mongoose.model("classdevice",ClDeviceSchema)
export default ClassDeviceModel;