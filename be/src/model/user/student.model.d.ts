import mongoose from 'mongoose';
declare const StudentModel: mongoose.Model<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    accountId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    gender: "male" | "female";
    address?: string | null;
    dateOfBirth?: NativeDate | null;
    parentPhone?: string | null;
    parentName?: string | null;
    status?: boolean | null;
    major?: mongoose.Types.ObjectId | null;
    yearOfAdmission?: number | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default StudentModel;
//# sourceMappingURL=student.model.d.ts.map