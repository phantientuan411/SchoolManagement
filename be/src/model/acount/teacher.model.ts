import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
    accountId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    }),
    teacherCode: ({
        type: String,
        required: true,
        unique: true
    }),
    name: ({
        type: String,
        required: true
    }),
    address: ({
        type: String,
    }),
    gender: ({
        type: String,
        enum: ["male", "female"]
    }),
    dateOfBird: ({
        type: Date,
    }),
    degree: ({
        type: String,
    }),
    major: ({
        type: String,
    }),
    yearExperience: ({
        type: String
    }),
    status: ({
        type: Boolean
    })
})
const teacherModel = mongoose.model("teachers", teacherSchema);
export default teacherModel;