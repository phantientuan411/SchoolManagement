import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil";

// Định nghĩa teacher
export interface Teacher {
    _id: string;
    accountId: string;
    teacherCode: string;
    name: string;
    address: string;
    gender: "male" | "female";
    dateOfBirth: string;
    degree: string;
    major: string;
    yearExperience: string;
    status: boolean;
}

// Định nghĩa dữ liệu teacher salary
export interface TeacherSalary {
    _id?: string;
    teacherId: Teacher;    // Teacher object
    amount: number;
    month: number;
    year: number;
    paid: boolean;
    datePaid?: string;
    note?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Định nghĩa kiểu Total Teacher Amount
interface TotalAmountTeacher {
    month: number
    year: number
    totalAmount: number

}

// Dữ liệu gửi đi
interface ApiTeacherSalaryRequest {
    pageIdTeacher: number;
    pageSizeTeacher: number;
}

// Dữ liệu trả về
interface ApiTeacherSalaryResponse {
    data: TeacherSalary[];
    totalPageTeacher: number;
    totalTeacher: number;
    totalAmountTeacher: TotalAmountTeacher[]
}

// Kiểu state
interface TeacherSalaryState {
    teacherSalary: TeacherSalary[];
    pageIdTeacher: number;
    pageSizeTeacher: number;
    loading: boolean;
    totalPageTeacher: number;
    totalTeacherSalary: number;
    totalAmountTeacher: TotalAmountTeacher[]
    error: string | null;
    paginationTeacher: number[];
}

const initialState: TeacherSalaryState = {
    teacherSalary: [],
    pageIdTeacher: 1,
    pageSizeTeacher: 5,
    paginationTeacher: [],
    totalPageTeacher: 0,
    totalTeacherSalary: 0,
    totalAmountTeacher: [],
    loading: false,
    error: null
};

// Thunk lấy dữ liệu
export const getTeacherSalary = createAsyncThunk<
    ApiTeacherSalaryResponse,
    ApiTeacherSalaryRequest,
    { rejectValue: string }
>(
    "teacherSalary/getTeacherSalary",
    async ({ pageIdTeacher, pageSizeTeacher }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const res = await get(
                "teacherSalary",
                { pageIdTeacher: pageIdTeacher, pageSizeTeacher: pageSizeTeacher },
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            );

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu lương giáo viên thất bại");
            }

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu lương giáo viên thất bại");
        }
    }
);

// Slice
const teacherSalarySlice = createSlice({
    name: "teacherSalary",
    initialState,
    reducers: {
        setPaginationTeacher: (state, action) => {
            state.paginationTeacher = action.payload;
        },
        setPageIdTeacher: (state, action) => {
            state.pageIdTeacher = action.payload;
        },
        setPageSizeTeacher: (state, action) => {
            state.pageSizeTeacher = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherSalary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeacherSalary.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.teacherSalary = action.payload.data;
                state.totalPageTeacher = action.payload.totalPageTeacher;
                state.totalTeacherSalary = action.payload.totalTeacher;
                state.totalAmountTeacher = action.payload.totalAmountTeacher
            })
            .addCase(getTeacherSalary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setPageIdTeacher, setPaginationTeacher, setPageSizeTeacher } = teacherSalarySlice.actions;
export default teacherSalarySlice.reducer;
