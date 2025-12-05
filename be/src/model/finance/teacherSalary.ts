import mongoose from "mongoose";

const teacherSalarySchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    datePaid: {
        type: Date,
        // Chỉ có ngày trả nếu đã thanh toán
        validate: {
            validator: function (value: any) {
                return !this.paid || (this.paid && value);
            },
            message: "Ngày trả lương phải được điền nếu lương đã thanh toán"
        }
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

const TeacherSalaryModel = mongoose.model("teacherssalarys", teacherSalarySchema);

export default TeacherSalaryModel;
