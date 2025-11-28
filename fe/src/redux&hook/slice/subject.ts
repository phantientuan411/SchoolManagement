import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Subject } from "../../type/user";
import { get } from "../../axios/ultil";

// Định nghĩa giữ liệu gửi đi theo Major
interface ApiSubjectEqualMajorRequest {
    majorId: string
}

// Định nghĩa dữ liệu trả về theo Major
interface ApiSubjectEqualMajorResponse {
    data: Subject[]
    total: number
    majorId: string
}

// Định nghĩa dữ liệu State Subject theo Major
interface SubjectEqualMajorState {
    [key: string]: Subject[]
}

// Định nghĩa State ban đầu
interface SubjectState {
    majorOpen: string[]
    subjectEqualMajor: SubjectEqualMajorState
    majorId: string
    loading: boolean
    error: string | null
}

const initialState: SubjectState = {
    majorOpen: [],
    subjectEqualMajor: {},
    majorId: "",
    loading: false,
    error: null
}

export const getSubjectEqualMajor = createAsyncThunk<
    ApiSubjectEqualMajorResponse,
    ApiSubjectEqualMajorRequest,
    { rejectValue: string }
>(
    "subject/getSubjectEqualMajor",
    async (
        { majorId },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                'subject/major',
                { majorId },
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

const getSubjectSlice = createSlice({
    name: "getSubject",
    initialState,
    reducers: {
        toggleMajor: (state, action) => {
            if (state.majorOpen.includes(action.payload)) {
                state.majorOpen = state.majorOpen.filter((e) => e !== action.payload)
            } else {
                state.majorOpen.push(action.payload)
            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubjectEqualMajor.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(getSubjectEqualMajor.fulfilled, (state, action) => {
                state.subjectEqualMajor = { ...state.subjectEqualMajor, [action.payload.majorId]: action.payload.data }
                state.loading = false
                state.error = null
                state.majorId = action.payload.majorId
            })
            .addCase(getSubjectEqualMajor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { toggleMajor } = getSubjectSlice.actions

export default getSubjectSlice.reducer