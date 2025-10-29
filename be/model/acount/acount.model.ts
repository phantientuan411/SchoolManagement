import mongoose from 'mongoose';
const accountSchema = new mongoose.Schema({
    accountId:({
        type:String,
        require:true,
        unique:true
    }),
    accountName:({
        type:String,
        require:true
    }),
    accountEmail:({
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    }),
    accountPassword:({
        type:String,
        require:true
    }),
    phone:({
        type:String,
        sparse:true,
    }),
    isActive:({
        type:Boolean,
        require:true
    }),
    role:({
        type:String,
        require:true,
        enum:["student","teacher","staff"]
    }),
    avatarUrl:({
        type:String //url anh
    }),
    avatarId:({
        type:String //cloudiary
    }),
    bio:({
       type:String,
       maxlength:200,
       trim:true 
    })
},
{
    timestamps:true
})
const accountModel = mongoose.models.accounts || mongoose.model('accounts', accountSchema);
export default accountModel;