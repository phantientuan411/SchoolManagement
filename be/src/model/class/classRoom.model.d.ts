import mongoose from "mongoose";
declare const ClassRoomModel: mongoose.Model<{
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    status: boolean;
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ClassRoomModel;
//# sourceMappingURL=classRoom.model.d.ts.map