import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil";

// Định nghĩa student
export interface Student {
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

// Định nghĩa dữ liệu student payment
interface StudentPayment {
    _id?: string;
    studentId: Student;   // ID học sinh
    amount: number;      // Số tiền đã trả
    type: "tuition" | "fee" | "other";
    paid: boolean;       // Trạng thái đã trả hay chưa
    date?: string;       // Ngày trả, chỉ có nếu paid = true
    note?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Dữ liệu gửi đi
interface ApiStudentPaymentRequest {
    pageIdStudent: number;
    pageSizeStudent: number;
}

// Dữ liệu trả về
interface ApiStudentPaymentResponse {
    data: StudentPayment[];
    totalPageStudent: number;
    totalStudent: number;
}

// Kiểu state
interface StudentPaymentState {
    studentPayment: StudentPayment[];
    pageIdStudent: number;
    pageSizeStudent: number;
    loading: boolean;
    totalPageStudent: number;
    totalStudent: number;
    error: string | null;
    paginationStudent: number[];
}

const initialState: StudentPaymentState = {
    studentPayment: [],
    pageIdStudent: 1,
    pageSizeStudent: 20,
    paginationStudent: [],
    totalPageStudent: 0,
    totalStudent: 0,
    loading: false,
    error: null
}

// Thunk lấy dữ liệu
export const getStudentPayment = createAsyncThunk<
    ApiStudentPaymentResponse,
    ApiStudentPaymentRequest,
    { rejectValue: string }
>(
    "studentPayment/getStudentPayment",
    async ({ pageIdStudent, pageSizeStudent }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const res = await get(
                "studentPayment",
                { pageIdStudent, pageSizeStudent },
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            );

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu học phí thất bại");
            }

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu học phí thất bại");
        }
    }
);

// Slice
const studentPaymentSlice = createSlice({
    name: "studentPayment",
    initialState,
    reducers: {
        setPaginationStudent: (state, action) => {
            state.paginationStudent = action.payload;
        },
        setPageIdStudent: (state, action) => {
            state.pageIdStudent = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudentPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.studentPayment = action.payload.data;
                state.totalPageStudent = action.payload.totalPageStudent;
                state.totalStudent = action.payload.totalStudent;
            })
            .addCase(getStudentPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setPageIdStudent, setPaginationStudent } = studentPaymentSlice.actions;
export default studentPaymentSlice.reducer;
