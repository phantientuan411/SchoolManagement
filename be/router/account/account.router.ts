import express from 'express';
import {signup} from '../../controller/account/account.controller.js'
const authRouter = express.Router();

authRouter.post('/signUp',signup);

export default authRouter