import {getEventsByPage, searchEvents, newEvent } from "../../controller/timetable/timeTable.controller.ts";
import  express from "express";
const timeTableRoute = express.Router();

timeTableRoute.get("/", getEventsByPage)
timeTableRoute.get("/search", searchEvents)
timeTableRoute.post("/new", newEvent)


export default timeTableRoute