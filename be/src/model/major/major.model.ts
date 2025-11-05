import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
    majorCode: ({
        type: String,
        required: true,
        unique: true
    }),
    majorName: ({
        type: String,
        required: true,
        unique: true
    })
})

const majorModel = mongoose.models.majors || mongoose.model('majors', majorSchema)

export default majorModel