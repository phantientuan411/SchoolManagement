import * as express from "express";
interface Student {
    _id: string;
    accountId: string;
    classId: string;
    name: string;
    address: string;
    gender: string;
    parentPhone: string;
    parentName: string;
    status: boolean;
    major: string;
    yearOfAdmission: number;
    dateOfBirth: string;
}
interface Mark {
    regular: string;
    final: string;
    total: string;
}
interface UpdateScore {
    _id: string;
    mark: Mark;
    classStudyId: string;
    status: string;
    studentId: Student;
}
declare const getClassEqualStudent: (req: express.Request<{}, {}, {}, {
    selected: string;
}>, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const updateScore: (req: express.Request<{}, {}, UpdateScore[], {}>, res: express.Response) => Promise<void>;
export { getClassEqualStudent, updateScore };
//# sourceMappingURL=classstudent.controller.d.ts.map