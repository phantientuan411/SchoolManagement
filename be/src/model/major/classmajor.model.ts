import mongoose from "mongoose";
const classmajorSchema = new mongoose.Schema({
    classCode: ({
        type: String,
        required: true,
        unique: true
    }),
    className: ({
        type: String,
        required: true,
        unique: true
    }),
    teacherId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        required: true
    }),
    majorId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "majors",
        required: true
    }),
    year: ({
        type: Number,
        required: true,
    })
})

const classmajorModel = mongoose.models.classmajors || mongoose.model('classmajors', classmajorSchema)
export default classmajorModel