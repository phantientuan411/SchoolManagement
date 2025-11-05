import express from 'express';
import { login, logout, signup } from '../../controller/account/account.controller.ts';
const authRouter = express.Router();
authRouter.post('/signUp', signup);
authRouter.post(`/login`, login);
authRouter.post('/logout', logout);
export default authRouter;