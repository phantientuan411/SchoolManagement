import express from "express"
import { getQueryExpense } from "../../controller/finance/expense.controller.ts"

const expenseRouter = express.Router()

expenseRouter.get("/", getQueryExpense)

export default expenseRouter