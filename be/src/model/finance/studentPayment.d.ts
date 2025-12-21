import mongoose from "mongoose";
declare const StudentPaymentModel: mongoose.Model<{
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    type: "other" | "tuition" | "fee";
    amount: number;
    paid: boolean;
    studentId: mongoose.Types.ObjectId;
    date?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default StudentPaymentModel;
//# sourceMappingURL=studentPayment.d.ts.map