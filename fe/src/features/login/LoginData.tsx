import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {post} from "../../axios/ultil.tsx"

//dinh nghia user
interface User {
    token: string;
    account:{
        email:string;
        password:string;
    };
}
//du lieu api
interface LoginResult {
    token:string;
    user:User;
}

//dinh nghia kieu state
interface LoginRespose{
    user:User | null;
    token:string | null;
    loading:boolean ;
    error:string | null;
}
//du lieu ban dau
const initialState: LoginRespose = {
    user:null,
    token:null,
    loading:false,
    error:null,
}

//async thunk call api

export const Login = createAsyncThunk<
    LoginResult ,
    {email:string;password:string},
    {rejectValue:string}
    >(
    "account/loginAccount",
    async(
        {email,password}:{email:string;password:string},
        {rejectWithValue}:{rejectWithValue:any}

    )=>{
        try {
            const res = await post<{token:string;user:User},{email:string;password:string}>(
                "account/login",
                {email,password},
                {baseURL:"http://localhost:3000/api"}
            );
            if(!res.ok||!res.data){
                return rejectWithValue(res.error||"đăng nhập thất bại")
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error.message || "đăng nhập thất bại")
        }
    }
);

//tạo slice

const LoginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(Login.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(Login.fulfilled,(state,action:PayloadAction<{token:string;user:User}>)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        })
        .addCase(Login.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});
export const {logout} = LoginSlice.actions;
export default LoginSlice.reducer;

