import express from "express"
import { getInfoDetail } from "../../controller/user/userInfo.controller.ts"

const userInfoRouter = express.Router()

userInfoRouter.get("/:id", getInfoDetail)

export default userInfoRouter