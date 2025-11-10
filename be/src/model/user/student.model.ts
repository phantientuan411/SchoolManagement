import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    accountId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    }),
    classId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "classmajors",
        required: true
    }),
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    dateOfBirth: {
        type: Date,
    },
    parentPhone: {
        type: String,
    },
    parentName: {
        type: String,
    },
    status: {
        type: Boolean
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "majors"
    },
    yearOfAdmission: {
        type: Number
    }
})
const StudentModel = mongoose.model("students", studentSchema);
export default StudentModel;
