import express from "express"
import { deleteInfoDetail, getInfoDetail } from "../../controller/user/userInfo.controller.ts"

const userInfoRouter = express.Router()

userInfoRouter.get("/:id", getInfoDetail)

userInfoRouter.delete("/:id", deleteInfoDetail)

export default userInfoRouter