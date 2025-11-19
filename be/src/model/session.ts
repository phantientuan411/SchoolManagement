    import mongoose from "mongoose";
    const sessionSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'accounts',
            required:true,
            index:true 
        },
        token:{
            type:String,
            required:true
        },
        expiresAt:{
            type:Date,
            required:true
        }  
    },
    {
        timestamps:true
    }
    );
    sessionSchema.index({expiresAt:1}, {expireAfterSeconds: 1});
    const SessionModel = mongoose.model('sessions',sessionSchema);
    export default SessionModel;