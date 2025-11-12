import mongoose from "mongoose";

const classstudentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true
    },
    classStudyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classstudies",
        required: true
    },
    mark: {
        regular: {
            type: String
        },
        final: {
            type: String
        },
        total: {
            type: String
        }
    },
    status: {
        type: String,
        default: "Studying",
        enum: ["Fail", "Pass", "Studying"]
    }
},
    {
        timestamps: true
    })

const classstudentModel = mongoose.model("classstudents", classstudentSchema)
export default classstudentModel