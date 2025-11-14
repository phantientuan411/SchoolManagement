import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Teacher } from "../../type/user";
import { get } from "../../axios/ultil.tsx";


// Định nghĩa kiểu dữ liệu gửi đi
interface ApiTeacherRequest {
    pageId: number,
    pageSize: number,
    searchName: string,
    major: string
}

// Định nghĩa kiểu dữ liệu trả về
interface ApiTeacherResponse {
    data: Teacher[]
    totalPage: number
    totalTeacher: number
}

//Định nghĩa kiểu state
interface TeacherState {
    teacher: Teacher[]
    pageId: number
    pageSize: number
    searchName: string
    major: string
    totalPage: number
    totalTeacher: number
    loading: boolean;
    error: string | null;
    pagination: number[];

}

const initialState: TeacherState = {
    teacher: [],
    pageId: 1,
    pageSize: 8,
    searchName: "",
    major: "",
    totalPage: 0,
    totalTeacher: 0,
    loading: false,
    error: null,
    pagination: []

}

export const getTeacher = createAsyncThunk<
    ApiTeacherResponse,
    ApiTeacherRequest,
    { rejectValue: string }
>(
    "teacher/getTeacher",
    async (
        { pageId, pageSize, searchName, major },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                "teacher",
                { pageId, pageSize, searchName, major },
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

const getTeacherSlice = createSlice({
    name: "getTeacher",
    initialState,
    reducers: {
        setPagination: (state, action) => {
            state.pagination = action.payload
        },
        setSearchName: (state, action) => {
            state.searchName = action.payload
        },
        setMajor: (state, action) => {
            state.major = action.payload
        },
        setPageId: (state, action) => {
            state.pageId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeacher.fulfilled, (state, action) => {
                state.teacher = action.payload.data
                state.totalPage = action.payload.totalPage
                state.totalTeacher = action.payload.totalTeacher
                state.loading = false
                state.error = null
            })
            .addCase(getTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },

})

export const { setPagination, setMajor, setPageId, setSearchName } = getTeacherSlice.actions

export default getTeacherSlice.reducer