import {resgisterEvent,getAllEvents,getEventsByPage, searchEvents, newEvent,ativeEvent,updateEvent } from "../../controller/timetable/timeTable.controller.ts";
import  express from "express";
const timeTableRoute = express.Router();

timeTableRoute.get("/", getEventsByPage)
timeTableRoute.get("/all", getAllEvents)
timeTableRoute.get("/search", searchEvents)
timeTableRoute.post("/new", newEvent)
timeTableRoute.post("/register", resgisterEvent)
timeTableRoute.post("/active",ativeEvent)
timeTableRoute.post("/update",updateEvent)
export default timeTableRoute