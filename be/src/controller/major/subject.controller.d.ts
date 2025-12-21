import * as express from "express";
interface EditSubject {
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}
interface NewSubject {
    majorId: string;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}
declare const getSubjectEqualMajor: (req: express.Request<{}, {}, {}, {
    majorId: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const getByMajorId: (req: express.Request<{
    majorId: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const getSubjectDetail: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const newSubject: (req: express.Request<{}, {}, NewSubject, {}>, res: express.Response) => Promise<void>;
declare const editSubject: (req: express.Request<{
    id: string;
}, {}, EditSubject, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const findSubjectBySemester: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteSubject: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { getSubjectEqualMajor, getSubjectDetail, newSubject, deleteSubject, editSubject, findSubjectBySemester, getByMajorId };
//# sourceMappingURL=subject.controller.d.ts.map