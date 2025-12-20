import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.ObjectId, ref: "subjects", required: true },
  period: { type: String, required: true },
  room: { type: String, required: true }
});

// Một ô có thể chứa nhiều Lesson
const CellSchema = {
  type: [
    {
      type: LessonSchema,
    }
  ],
  default: null
};

// Mảng 2 chiều của CellSchema
const EventSchema = new mongoose.Schema(
  {
    rows: {
      type: [[CellSchema]],
      required: true,
    },
    isActive: { type: Boolean, default: false },
    major: { type: mongoose.Schema.Types.ObjectId, ref: "majors" },
    className: { type: mongoose.Schema.Types.ObjectId, ref: "classmajors" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    september: { type: String },
    year: { type: String },
  },
  { timestamps: true }
);
const EventModel = mongoose.model("events", EventSchema);
export default EventModel
