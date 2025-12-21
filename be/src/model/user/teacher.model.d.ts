import mongoose from 'mongoose';
declare const TeacherModel: mongoose.Model<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    status?: boolean | null;
    major?: string | null;
    teacherCode?: string | null;
    degree?: string | null;
    yearExperience?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TeacherModel;
//# sourceMappingURL=teacher.model.d.ts.map