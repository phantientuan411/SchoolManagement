import mongoose from "mongoose";

const studentPaymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["tuition", "fee", "other"],
        default: "tuition"
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        // Chỉ lưu date nếu đã trả
        validate: {
            validator: function (value: any) {
                return !this.paid || (this.paid && value);
            },
            message: "Ngày phải được điền nếu học phí đã trả"
        }
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

const StudentPaymentModel = mongoose.model("studenttpayments", studentPaymentSchema);

export default StudentPaymentModel;
