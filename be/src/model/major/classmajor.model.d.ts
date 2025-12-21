import mongoose from "mongoose";
declare const classmajorModel: mongoose.Model<{
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
}, {}, mongoose.DefaultSchemaOptions> & {
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    year: number;
    classCode: string;
    className: string;
    teacherId: mongoose.Types.ObjectId;
    majorId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default classmajorModel;
//# sourceMappingURL=classmajor.model.d.ts.map