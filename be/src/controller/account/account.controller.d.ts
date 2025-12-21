import * as express from "express";
declare const signup: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const login: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const logout: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { signup, login, logout };
//# sourceMappingURL=account.controller.d.ts.map