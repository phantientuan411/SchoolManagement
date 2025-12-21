import mongoose from "mongoose";
declare const subjectModel: mongoose.Model<{
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    majorId: mongoose.Types.ObjectId;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default subjectModel;
//# sourceMappingURL=subject.model.d.ts.map