import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    donor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String
    },
    completed: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const InvestmentModel = mongoose.model("investments", investmentSchema);

export default InvestmentModel;
