import mongoose from "mongoose";
declare const ExpenseModel: mongoose.Model<{
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    year: number;
    amount: number;
    month: number;
    paid: boolean;
    paidDate?: NativeDate | null;
    note?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ExpenseModel;
//# sourceMappingURL=expense.d.ts.map