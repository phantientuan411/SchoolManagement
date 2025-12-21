import * as express from "express";
interface InvestmentQuery {
    pageId: string;
    pageSize: string;
}
declare const getQueryInvestment: (req: express.Request<{}, {}, {}, InvestmentQuery>, res: express.Response) => Promise<void>;
export { getQueryInvestment };
//# sourceMappingURL=investment.controller.d.ts.map