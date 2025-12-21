import express from "express";
declare const getEventsByPage: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const getAllEvents: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const resgisterEvent: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const searchEvents: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const getEventForStudent: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const newEvent: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const ativeEvent: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const updateEvent: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { resgisterEvent, getAllEvents, getEventsByPage, searchEvents, newEvent, getEventForStudent, ativeEvent, updateEvent };
//# sourceMappingURL=timeTable.controller.d.ts.map