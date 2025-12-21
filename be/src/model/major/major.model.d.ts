import mongoose from "mongoose";
declare const majorModel: mongoose.Model<{
    majorCode: string;
    majorName: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    majorCode: string;
    majorName: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    majorCode: string;
    majorName: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    majorCode: string;
    majorName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    majorCode: string;
    majorName: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    majorCode: string;
    majorName: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default majorModel;
//# sourceMappingURL=major.model.d.ts.map