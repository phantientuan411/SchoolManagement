import * as express from "express";
interface EditClassStudy {
    classCode: string;
    teacherId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    dateOfWeek: string;
}
declare const getClassStudy: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const getClassStudyEqualSubject: (req: express.Request<{}, {}, {}, {
    subjectId: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const getClassStudyDetail: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const deleteClassStudy: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const editClassStudy: (req: express.Request<{
    id: string;
}, {}, {
    editClassStudy: EditClassStudy;
}, {}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const newClassStudy: (req: express.Request, res: express.Response) => Promise<void>;
export { getClassStudy, getClassStudyEqualSubject, deleteClassStudy, editClassStudy, newClassStudy, getClassStudyDetail };
//# sourceMappingURL=classstudy.controller.d.ts.map