import express from 'express';
import { login, logout, signup } from '../../controller/account/account.controller.ts';
import protectRouter from '../../middlewares/authMiddleWare.ts';
const authRouter = express.Router();
authRouter.post('/signUp',protectRouter, signup);
authRouter.post(`/login`, login);
authRouter.post('/logout', logout);
export default authRouter;