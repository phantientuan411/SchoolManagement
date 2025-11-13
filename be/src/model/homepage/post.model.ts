import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true },
    content: {
        type: String,
        required: true },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'accounts',
        required:true
    },
    type:{
        type:String,
        required:true
    },
    isUpdate:{
        type:Boolean,
        default:false
    },
    isDelete:{
        type:Boolean,
        default:false
    }
}
,{
    timestamps:true
})
const PostModel = mongoose.model('posts',PostSchema);
export default PostModel;