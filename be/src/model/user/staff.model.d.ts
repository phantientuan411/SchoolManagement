import mongoose from 'mongoose';
declare const StaffModel: mongoose.Model<{
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    accountId: string;
    address?: string | null;
    gender?: "male" | "female" | null;
    status?: boolean | null;
    profession?: "chef" | "guar" | "labor" | null;
    year?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default StaffModel;
//# sourceMappingURL=staff.model.d.ts.map