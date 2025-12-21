import * as express from "express";
declare const getInfoDetail: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const deleteInfoDetail: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
export { getInfoDetail, deleteInfoDetail };
//# sourceMappingURL=userInfo.controller.d.ts.map