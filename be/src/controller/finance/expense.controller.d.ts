import * as express from "express";
interface ExpenseQuery {
    pageIdExpense: string;
    pageSizeExpense: string;
}
declare const getQueryExpense: (req: express.Request<{}, {}, {}, ExpenseQuery>, res: express.Response) => Promise<void>;
export { getQueryExpense };
//# sourceMappingURL=expense.controller.d.ts.map