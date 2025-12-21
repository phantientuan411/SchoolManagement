import * as express from "express";
interface TeacherSalaryQuery {
    pageIdTeacher: string;
    pageSizeTeacher: string;
}
declare const getQueryTeacherSalary: (req: express.Request<{}, {}, {}, TeacherSalaryQuery>, res: express.Response) => Promise<void>;
export { getQueryTeacherSalary };
//# sourceMappingURL=teacherSalary.controller.d.ts.map