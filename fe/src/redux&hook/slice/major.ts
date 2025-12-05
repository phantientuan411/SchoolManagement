
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MajorInfo, Subject } from "../../type/user";
import { get } from "../../axios/ultil";


// 
interface ClassMajorDetails {
    _id: string
    classCode: string
    className: string
    teacherId: string
    majorId: MajorInfo
    year: number
}

interface StudentDetails {
    _id: string;
    accountId: string;
    classId: string;
    name: string;
    address: string;
    gender: string
    parentPhone: string;
    parentName: string;
    status: boolean;
    major: string;
    yearOfAdmission: number;
    dateOfBirth: string;
}

interface TeacherDetails {
    _id: string;
    accountId: string;
    teacherCode: string;
    name: string;
    address: string;
    gender: "male" | "female"
    dateOfBirth: string;
    degree: string;
    major: string;
    yearExperience: string;
    status: boolean;
}
// Định nghĩa dữ liệu major
interface Major {
    _id: string
    majorName: string
    majorCode: string
    subjects: Subject[]
    students: StudentDetails[]
    teachers: TeacherDetails[]
    classMajors: ClassMajorDetails[]
}

// Định nghĩa dữ liệu gửi đi
interface ApiMajorRequest {

}

// Định nghĩa dữ liệu gửi đi Major Details
interface ApiMajorDetailsRequest {
    id: string
}

// Định nghĩa dữ liệu trả về
interface ApiMajorResponse {
    data: Major[]
    total: number
}

// Định nghĩa kiểu state
interface MajorState {
    major: Major[];
    majorDetails: Major[]
    loading: boolean;
    error: string | null;
    total: number
}

// Định nghĩa kiểu state ban đầu
const initialState: MajorState = {
    major: [],
    majorDetails: [],
    loading: false,
    error: null,
    total: 0
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
                return rejectWithValue(res.error || "Lấy dữ liệu thất bại")
            }
            return res.data
        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)

export const getMajorDetails = createAsyncThunk<
    ApiMajorResponse,
    ApiMajorDetailsRequest,
    { rejectValue: string }
>(
    "major/getMajorDetails",
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
                `major/${id}`,
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
                state.total = action.payload.total
            })
            .addCase(getMajor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getMajorDetails.fulfilled, (state, action) => {
                state.majorDetails = action.payload.data
                state.loading = false
                state.error = null
            })
    },
})

export const { } = getMajorSlice.actions

export default getMajorSlice.reducer