import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    majorId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "majors",
        required: true

    }),
    subjectCode: ({
        type: String,
        required: true,
        unique: true
    }),
    subjectName: ({
        type: String,
        required: true,
        unique: true
    }),
    numberCredits: ({
        type: Number,
        required: true,
        unique: true
    }),
    totalFee: ({
        type: Number,
        required: true,
        unique: true
    })
})

const subjectModel =  mongoose.model('subjects', subjectSchema)

export default subjectModel