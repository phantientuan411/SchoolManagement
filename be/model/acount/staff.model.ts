import * as mongoose from 'mongoose';
const staffSchema = new mongoose.Schema({
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
    profession:({
        type:String,
        enum:["chef","guar","labor"]
    }),
    year:({
        type:Number
    }),
    status:({
        type:Boolean
    })


})
const staffModel = mongoose.models.staffs || mongoose.model("staffs",staffSchema);
export default staffModel;