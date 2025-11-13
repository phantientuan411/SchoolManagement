import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/login/LoginData.tsx'
import getStudentReducer from "../features/listStudent/ListStudentData.tsx";
import useReducer from "../redux&hook/slice/userSlice.ts";
import postReducer from "../features/homePage/HomeData.tsx"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: useReducer,
    getStudent: getStudentReducer,
    homePage:postReducer
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch