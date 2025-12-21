import express from "express";
interface ClassRoomQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
}
interface UpdateClassRoom {
    roomId: string;
    roomType: string;
    possition: string;
    capacity: number;
    status: boolean;
}
declare const getAllClassRoom: (req: express.Request<{}, {}, {}, ClassRoomQuery>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const findClass: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updateClassRoom: (req: express.Request<{
    id: string;
}, {}, UpdateClassRoom, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteClassRoom: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getAllClassRoom, findClass, updateClassRoom, deleteClassRoom };
//# sourceMappingURL=classRoom.controller.d.ts.map