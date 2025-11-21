import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MajorInfo } from "../../type/user";
import { get } from "../../axios/ultil";

// Định nghĩa dữ liệu gửi đi
interface ApiMajorRequest {

}

// Định nghĩa dữ liệu trả về
interface ApiMajorResponse {
    data: MajorInfo[]
}

// Định nghĩa kiểu state
interface MajorState {
    major: MajorInfo[];
    loading: boolean;
    error: string | null
}

// Định nghĩa kiểu state ban đầu
const initialState: MajorState = {
    major: [],
    loading: false,
    error: null
}

export const getMajor = createAsyncThunk<
    ApiMajorResponse,
    ApiMajorRequest,
    { rejectValue: string }
>(
    "major/getMajor",
    async (
        { },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }
            const res = await get(
                "major",
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

const getMajorSlice = createSlice({
    name: "getMajor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMajor.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMajor.fulfilled, (state, action) => {
                state.major = action.payload.data
                state.loading = false
                state.error = null
            })
            .addCase(getMajor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { } = getMajorSlice.actions

export default getMajorSlice.reducer