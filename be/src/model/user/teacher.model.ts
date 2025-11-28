import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
    accountId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    }),
    teacherCode: ({
        type: String,
        unique: true
    }),
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    dateOfBirth: {
        type: Date,
    },
    degree: {
        type: String,
    },
    major: {
        type: String,
    },
    yearExperience: {
        type: String
    },
    status: {
        type: Boolean
    }
})
const TeacherModel = mongoose.model("teachers", teacherSchema);
export default TeacherModel;