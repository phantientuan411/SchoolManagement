import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ClassStudy } from "../../type/user";
import { get } from "../../axios/ultil";

// Định nghĩa dữ liệu gửi đi
interface ApiClassStudyRequest {
    id: string
}

// Định nghĩa dữ liệu trả về
interface ApiClassStudyResponse {
    data: ClassStudy[]
    totalClass: number
}

// Định nghĩa state ban đầu
interface ClassStudyState {
    classStudy: ClassStudy[]
    totalClass: number
    loading: boolean
    error: string | null
}

const initialState: ClassStudyState = {
    classStudy: [],
    totalClass: 0,
    loading: false,
    error: null
}

export const getClassStudy = createAsyncThunk<
    ApiClassStudyResponse,
    ApiClassStudyRequest,
    { rejectValue: string }
>(
    "classStudy/getClassStudy",
    async (
        { id },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                `classstudy/teacher/${id}`,
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

const getClassStudySlice = createSlice({
    name: "getClassStudy",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassStudy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getClassStudy.fulfilled, (state, action) => {
                state.classStudy = action.payload.data
                state.totalClass = action.payload.totalClass
                state.loading = false
                state.error = null
            })
            .addCase(getClassStudy.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { } = getClassStudySlice.actions

export default getClassStudySlice.reducer