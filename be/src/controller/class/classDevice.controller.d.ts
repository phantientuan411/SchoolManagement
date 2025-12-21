import express from "express";
interface ClassDeviceQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
}
interface UpdateClassDevice {
    roomId: string;
    device: [device];
}
interface device {
    name: string;
    quantity: number;
    qualities: string;
    status: boolean;
}
declare const getAllClassDevice: (req: express.Request<{}, {}, {}, ClassDeviceQuery>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const findClassDevice: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updateClassDevice: (req: express.Request<{
    id: string;
}, {}, UpdateClassDevice, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteCls: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getAllClassDevice, findClassDevice, updateClassDevice, deleteCls };
//# sourceMappingURL=classDevice.controller.d.ts.map