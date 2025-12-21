import mongoose from 'mongoose';
declare const accountModel: mongoose.Model<{
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    isActive: boolean;
    role: "student" | "teacher" | "staff" | "admin";
    phone?: string | null;
    avatarUrl?: string | null;
    avatarId?: string | null;
    bio?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default accountModel;
//# sourceMappingURL=acount.model.d.ts.map