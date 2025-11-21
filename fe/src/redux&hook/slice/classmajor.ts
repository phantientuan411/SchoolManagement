
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil.tsx";
import type { ClassMajor } from "../../type/user.ts";


// Định nghĩa dữ liệu gửi đi 
interface ApiClassMajorRequest {
    selected: string
}

// Định nghĩa dữ liệu trả về
interface ApiClassMajorResponse {
    data: ClassMajor[]
}

// Định nghĩa kiểu state
interface ClassMajorState {
    classMajor: ClassMajor[]
    allMajor: ClassMajor[]
    loading: boolean
    error: string | null
}

// Định nghĩa state ban đầu
const initialState: ClassMajorState = {
    classMajor: [],
    allMajor: [],
    loading: false,
    error: null
}

export const getClassMajor = createAsyncThunk<
    ApiClassMajorResponse,
    ApiClassMajorRequest,
    { rejectValue: string }
>(
    "classMajor/getClassMajor",
    async ({ selected },
        { rejectWithValue }

    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                "classmajor",
                { selected },
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

export const getAllClassMajor = createAsyncThunk<
    ApiClassMajorResponse,
    {},
    { rejectValue: string }
>(
    "classMajor/getAllClassMajor",
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
                "classmajor/all",
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

const getClassMajorSlice = createSlice({
    name: "getClassMajor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassMajor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassMajor.fulfilled, (state, action) => {
                state.classMajor = action.payload.data
                state.loading = false
                state.error = null
            })
            .addCase(getClassMajor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllClassMajor.fulfilled, (state, action) => {
                state.allMajor = action.payload.data
                state.loading = false
                state.error = null
            })
    },
})

export const { } = getClassMajorSlice.actions

export default getClassMajorSlice.reducer