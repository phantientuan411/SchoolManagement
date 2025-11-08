import { JwtPayload } from "jsonwebtoken";


export type TUser = any

declare global {
  namespace Express {
    interface Request {
      user?: TUser ; // hoặc kiểu tùy bạn
    }
  }
}
