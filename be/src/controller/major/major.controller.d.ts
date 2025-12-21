import * as express from "express";
declare const getAllMajor: (req: express.Request<{}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const getMajorDetails: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
export { getAllMajor, getMajorDetails };
//# sourceMappingURL=major.controller.d.ts.map