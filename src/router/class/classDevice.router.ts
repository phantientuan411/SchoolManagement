import { getAllClassDevice, findClassDevice, updateClassDevice, deleteCls } from "../../controller/class/classDevice.controller.ts";
import e from "express";
const ClassDeviceRouter=e.Router()
ClassDeviceRouter.get("/",getAllClassDevice)
ClassDeviceRouter.get("/find/:id",findClassDevice)
ClassDeviceRouter.put("/uppdate/:id",updateClassDevice)
ClassDeviceRouter.delete("/delete/:id",deleteCls)
export default ClassDeviceRouter

//app.use("/api/classDevice", classDeviceRouter)
