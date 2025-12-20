import {getAllClassRoom,findClass,updateClassRoom,deleteClassRoom} from "../../controller/class/classRoom.controller.ts"
import e from "express"
const ClassRoomRouter=e.Router()
ClassRoomRouter.get("/",getAllClassRoom)
ClassRoomRouter.get("/find/:id",findClass)
ClassRoomRouter.put("/uppdate/:id",updateClassRoom)
ClassRoomRouter.delete("/delete/:id",deleteClassRoom)
export default ClassRoomRouter

//app.use("/api/classRoom", classRoomRouter)