import * as express from "express";
interface StudentPaymentQuery {
    pageIdStudent: string;
    pageSizeStudent: string;
}
declare const getQueryStudentPayment: (req: express.Request<{}, {}, {}, StudentPaymentQuery>, res: express.Response) => Promise<void>;
export { getQueryStudentPayment };
//# sourceMappingURL=studentPayment.controller.d.ts.map