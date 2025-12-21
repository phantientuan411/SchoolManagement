import mongoose from "mongoose";
declare const ClassDeviceModel: mongoose.Model<{
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    roomId: mongoose.Types.ObjectId;
    device: mongoose.Types.DocumentArray<{
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }> & {
        name: string;
        status: boolean;
        quantity: number;
        qualities: "good" | "degraded";
    }>;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ClassDeviceModel;
//# sourceMappingURL=classDevice.model.d.ts.map