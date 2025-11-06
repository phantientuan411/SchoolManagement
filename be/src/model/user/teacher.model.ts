import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
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
        enum:["male","female"],
        default:"male"
    },
    dateOfBird:{
        type:Date,
    },
    degree:{
        type:String,
    }, 
    major:{
        type:String,
    },
    yearExperience:{
        type:String
    },
    status:{
        type:Boolean
    }
})
const TeacherModel = mongoose.model("teachers",teacherSchema);
export default TeacherModel;