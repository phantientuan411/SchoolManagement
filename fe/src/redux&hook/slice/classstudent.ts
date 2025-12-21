
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ClassStudent } from "../../type/user"
import { get } from "../../axios/ultil.tsx";

// Định nghĩa kiểu dữ liệu gửi đi
interface ApiClassStudentRequest {
    selected: string
}

// Định nghĩa kiểu dữ liệu trả về
interface ApiClassStudentResponse {
    total: number
    totalFail: number
    totalPass: number
    totalStudying: number
    data: ClassStudent[]
    pass: ClassStudent[]
}

// Định nghĩa kiểu state
interface ClassStudentState {
    total: number
    totalFail: number
    totalPass: number
    totalStudying: number
    classStudent: ClassStudent[]
    pass: ClassStudent[]
    loading: boolean
    error: string | null
}

const initialState: ClassStudentState = {
    total: 0,
    totalFail: 0,
    totalPass: 0,
    totalStudying: 0,
    classStudent: [],
    pass: [],
    loading: false,
    error: null

}


export const getClassStudent = createAsyncThunk<
    ApiClassStudentResponse,
    ApiClassStudentRequest,
    { rejectValue: string }
>(
    "classstudent/getClassStudent",
    async (
        { selected },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                "classstudent/student",
                { selected },
                {
                    
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

const getClassStudentSlice = createSlice({
    name: "getClassStudent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassStudent.fulfilled, (state, action) => {
                state.classStudent = action.payload.data
                state.pass = action.payload.pass
                state.total = action.payload.total
                state.totalFail = action.payload.totalFail
                state.totalPass = action.payload.totalPass
                state.totalStudying = action.payload.totalStudying
                state.loading = false
                state.error = null
            })
            .addCase(getClassStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export const { } = getClassStudentSlice.actions

export default getClassStudentSlice.reducer
