import mongoose from "mongoose";
declare const InvestmentModel: mongoose.Model<{
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    date: NativeDate;
    amount: number;
    donor: string;
    completed: boolean;
    note?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default InvestmentModel;
//# sourceMappingURL=investment.d.ts.map