import mongoose from "mongoose";
declare const classstudentModel: mongoose.Model<{
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    status: "Studying" | "Fail" | "Pass";
    studentId: mongoose.Types.ObjectId;
    classStudyId: mongoose.Types.ObjectId;
    mark?: {
        regular?: string | null;
        final?: string | null;
        total?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default classstudentModel;
//# sourceMappingURL=classstudent.d.ts.map