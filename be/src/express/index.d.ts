import { JwtPayload } from "jsonwebtoken";


export type TUser = any
export type subject = any;
declare global {
  namespace Express {
    interface Request {
      user?: TUser ; // hoặc kiểu tùy bạn
      subject?: subject;
    }
  }
}
