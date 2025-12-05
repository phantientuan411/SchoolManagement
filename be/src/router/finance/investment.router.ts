import express from "express"
import { getQueryInvestment } from "../../controller/finance/investment.controller.ts"

const investmentRouter = express.Router()

investmentRouter.get("/", getQueryInvestment)

export default investmentRouter