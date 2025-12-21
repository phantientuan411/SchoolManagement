import * as express from "express";
declare const test: (req: express.Request, res: express.Response) => Promise<void>;
interface SortQuery {
    [key: string]: 'asc' | 'desc' | "";
}
interface StudentQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
    sort: SortQuery | string;
}
interface UpdateStudent {
    name: string;
    address: string;
    gender: string;
    parentPhone: string;
    parentName: string;
    status: boolean;
    dateOfBirth: string;
}
declare const getQueryStudent: (req: express.Request<{}, {}, {}, StudentQuery>, res: express.Response) => Promise<void>;
declare const updateInfoStudent: (req: express.Request<{
    id: string;
}, {}, UpdateStudent, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { test, getQueryStudent, updateInfoStudent };
//# sourceMappingURL=student.controller.d.ts.map