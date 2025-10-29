import * as mongoose from 'mongoose';
const accountSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
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
        unique:true
    }),
    accountPassword:({
        type:String,
        require:true
    }),
    isActive:({
        type:Boolean,
        require:true
    }),
    role:({
        type:String,
        require:true,
        enum:["student","teacher","staff"]
    })
})
const accountModel = mongoose.models.accounts || mongoose.model('accounts', accountSchema);
export default accountModel;