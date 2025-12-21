import * as express from "express";
declare const getClassMajorEqualStudent: (req: express.Request<{}, {}, {}, {
    selected: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const getAllClassMajor: (req: express.Request<{}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const getClassMajorByMajor: (req: express.Request<{}, {}, {}, {
    majorId: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const getClassMajorDetail: (req: express.Request<{
    id: string;
}, {}, {}, {}>, res: express.Response) => Promise<void>;
declare const newClassMajor: (req: express.Request<{}, {}, {
    classCode: string;
    className: string;
    teacherId: string;
    majorId: string;
    year: number;
}>, res: express.Response) => Promise<void>;
declare const editClassMajor: (req: express.Request<{
    id: string;
}, {}, {
    classCode: string;
    className: string;
    teacherId: string;
    year: number;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const deleteClassMajor: (req: express.Request<{
    id: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { getClassMajorByMajor, getClassMajorEqualStudent, getAllClassMajor, getClassMajorDetail, newClassMajor, editClassMajor, deleteClassMajor };
//# sourceMappingURL=classmajor.controller.d.ts.map