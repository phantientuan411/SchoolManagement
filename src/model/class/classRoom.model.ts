import mongoose from "mongoose";
const ClRoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    roomType:{
        type:String,
        required:true
    },
    possition:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }

}
,{
    timestamps:true
})
const ClassRoomModel=mongoose.model("classroom",ClRoomSchema)
export default ClassRoomModel;