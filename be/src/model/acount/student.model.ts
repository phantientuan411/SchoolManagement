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
    name: ({
        type: String,
        required: true
    }),
    address: ({
        type: String,
        required: true
    }),
    gender: ({
        type: String,
        enum: ["male", "female"]
    }),
    dateOfBird: ({
        type: Date,
    }),
    parentPhone: ({
        type: String,
    }),
    parentName: ({
        type: String,
    }),
    status: ({
        type: Boolean
    }),
    major: ({
        type: String,
        required: true
    }),
    yearOfAdmission: ({
        type: Number
    })
})
const studentModel = mongoose.models.students || mongoose.model("students", studentSchema);
export default studentModel;