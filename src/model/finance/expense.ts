import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "electricity",
            "water",
            "internet",
            "maintenance",
            "rent",
            "other"
        ],
    },

    amount: {
        type: Number,
        required: true
    },

    month: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    paid: {
        type: Boolean,
        default: false
    },

    paidDate: {
        type: Date,
    },

    note: {
        type: String
    },

}, {
    timestamps: true
});

const ExpenseModel = mongoose.model("expenses", expenseSchema);

export default ExpenseModel;
