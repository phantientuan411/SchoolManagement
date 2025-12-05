import mongoose from "mongoose";

const classstudySchema = new mongoose.Schema({
    classCode: {
        type: String,
        required: true,
        unique: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    dateOfWeek: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    }

})

const classstudyModel = mongoose.model('classstudies', classstudySchema)

export default classstudyModel