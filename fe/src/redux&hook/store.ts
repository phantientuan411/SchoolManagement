import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/login/LoginData.tsx'
import getStudentReducer from "../features/listStudent/ListStudentData.tsx";
import useReducer from "../redux&hook/slice/userSlice.ts";
import postReducer from "../features/homePage/HomeData.tsx"
import getTeacherReducer from "../features/listTeacher/ListTeacherData.tsx";
import getUserInfoReducer from "../features/userInfo/UserInfoData.tsx";
import getClassStudentReducer from "./slice/classstudent.ts";
import getClassMajorReducer from "./slice/classmajor.ts";
import getMajorReducer from "./slice/major.ts";
import getClassStudyReducer from "./slice/classstudy.ts";
import createAccountReducer from "../features/newAccount/NewAccountData.tsx";
import getSubjectReducer from "./slice/subject.ts";
import getInvestmentReducer from "./slice/investment.ts";
import getStudentPaymentReducer from "./slice/studentpayment.ts";
import getTeacherSalaryReducer from "./slice/teachersalary.ts";
import getExpenseReducer from "./slice/expense.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: useReducer,
    getStudent: getStudentReducer,
    homePage: postReducer,
    getTeacher: getTeacherReducer,
    getUserInfo: getUserInfoReducer,
    getClassStudent: getClassStudentReducer,
    getClassMajor: getClassMajorReducer,
    getMajor: getMajorReducer,
    getClassStudy: getClassStudyReducer,
    createAccount: createAccountReducer,
    getSubject: getSubjectReducer,
    getInvestment: getInvestmentReducer,
    getStudentPayment: getStudentPaymentReducer,
    getTeacherSalary: getTeacherSalaryReducer,
    getExpense: getExpenseReducer,
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch