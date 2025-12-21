import mongoose from "mongoose";
declare const PostModel: mongoose.Model<{
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    type: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    isUpdate: boolean;
    isDelete: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default PostModel;
//# sourceMappingURL=post.model.d.ts.map