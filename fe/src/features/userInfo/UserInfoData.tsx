import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Student, Teacher } from "../../type/user";
import { get } from "../../axios/ultil.tsx";

//Định nghĩa kiểu dữ liệu gửi đi
interface ApiUserRequest {
    id: string
}

// Định nghĩa kiểu dữ liệu trả về
interface ApiUserResponse {
    data: Student[] | Teacher[]
}

// Định nghĩa kiểu state
interface UserInfoState {
    data: Student[] | Teacher[]
    id: string
    loading: boolean
    error: string | null
}

const initialState: UserInfoState = {
    id: "",
    data: [],
    loading: false,
    error: null

}

export const getUserInfo = createAsyncThunk<
    ApiUserResponse,
    ApiUserRequest,
    { rejectValue: string }
>(
    "userInfo/getUserInfo",
    async ({ id }, { rejectWithValue }

    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                `userinfo/${id}`,
                {},
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu giáo viên thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu giáo viên thất bại")
        }
    }
)

const getUserInfoSlice = createSlice({
    name: "getUserInfo",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.error = null
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },

})

export const { setId } = getUserInfoSlice.actions

export default getUserInfoSlice.reducer