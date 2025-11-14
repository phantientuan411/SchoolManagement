import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/login/LoginData.tsx'
import getStudentReducer from "../features/listStudent/ListStudentData.tsx";
import useReducer from "../redux&hook/slice/userSlice.ts";
import getTeacherReducer from "../features/listTeacher/ListTeacherData.tsx";
import getUserInfoReducer from "../features/userInfo/UserInfoData.tsx";
import getClassStudentReducer from "./slice/classstudent.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: useReducer,
    getStudent: getStudentReducer,
    getTeacher: getTeacherReducer,
    getUserInfo: getUserInfoReducer,
    getClassStudent: getClassStudentReducer,
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch