import mongoose from "mongoose";
declare const classstudyModel: mongoose.Model<{
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
}, {}, mongoose.DefaultSchemaOptions> & {
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    classCode: string;
    teacherId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    startDate: NativeDate;
    endDate: NativeDate;
    startTime: string;
    endTime: string;
    dateOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default classstudyModel;
//# sourceMappingURL=classstudies.model.d.ts.map