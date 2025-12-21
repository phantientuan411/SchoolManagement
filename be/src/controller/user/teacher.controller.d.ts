import * as express from "express";
interface TeacherQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
    major: string;
}
interface UpdateTeacher {
    name: string;
    address: string;
    gender: string;
    status: boolean;
    dateOfBirth: string;
    degree: string;
}
declare const getQueryTeacher: (req: express.Request<{}, {}, {}, TeacherQuery>, res: express.Response) => Promise<void>;
declare const updateTeacher: (req: express.Request<{
    id: string;
}, {}, UpdateTeacher, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { getQueryTeacher, updateTeacher };
//# sourceMappingURL=teacher.controller.d.ts.map