import mongoose from "mongoose";
declare const TeacherSalaryModel: mongoose.Model<{
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    year: number;
    teacherId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    paid: boolean;
    note?: string | null;
    datePaid?: NativeDate | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TeacherSalaryModel;
//# sourceMappingURL=teacherSalary.d.ts.map