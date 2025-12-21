import { type Request, type Response, type NextFunction } from "express";
declare const protectRouter: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default protectRouter;
//# sourceMappingURL=authMiddleWare.d.ts.map