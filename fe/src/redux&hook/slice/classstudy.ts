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

// Định nghĩa dữ liệu gửi đi theo Subject
interface ApiClassStudyEqualSubject {
    subjectId: string
}

// Định nghĩa dữ liệu trả về theo Subject
interface ApiClassStudyResponse {
    data: ClassStudy[]
    totalClass: number
    subjectId: string
}

// Định nghĩa dữ liệu Class theo Subject
interface ClassStudyEqualSubject {
    [key: string]: ClassStudy[]
}

// Định nghĩa state ban đầu
interface ClassStudyState {
    classStudy: ClassStudy[]
    totalClass: number
    loading: boolean
    error: string | null
    subjectOpen: string[]
    classStudyEqualSubject: ClassStudyEqualSubject
    subjectId: string
}

const initialState: ClassStudyState = {
    classStudy: [],
    totalClass: 0,
    loading: false,
    error: null,
    subjectOpen: [],
    classStudyEqualSubject: {},
    subjectId: ""
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
                return rejectWithValue(res.error || "Lấy dữ liệu thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)

export const getClassStudyEqualSubject = createAsyncThunk<
    ApiClassStudyResponse,
    ApiClassStudyEqualSubject,
    { rejectValue: string }
>(
    "classStudy/getClassStudyEqualSubject",
    async (
        { subjectId },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                "classstudy/subject",
                { subjectId },
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)

const getClassStudySlice = createSlice({
    name: "getClassStudy",
    initialState,
    reducers: {
        toggleSubject: (state, action) => {
            if (state.subjectOpen.includes(action.payload)) {
                state.subjectOpen = state.subjectOpen.filter((e) => e !== action.payload)
            } else {
                state.subjectOpen.push(action.payload)
            }

        }
    },
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
            .addCase(getClassStudyEqualSubject.fulfilled, (state, action) => {
                state.classStudyEqualSubject = { ...state.classStudyEqualSubject, [action.payload.subjectId]: action.payload.data }
                state.subjectId = action.payload.subjectId
            })
    },
})

export const { toggleSubject } = getClassStudySlice.actions

export default getClassStudySlice.reducer