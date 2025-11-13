import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil.tsx";

// Định nghĩa dữ liệu Student
interface Student {
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

// Định nghĩa dữ liệu Sort
interface SortQuery {
    name: 'asc' | 'desc' | "";
    classId: 'asc' | 'desc' | "";
    dateOfBirth: 'asc' | 'desc' | "";
    major: 'asc' | 'desc' | "";
    _id: 'asc' | 'desc' | "";
}

// Định nghĩa dữ liệu trả về
interface ApiStudentRespond {
    data: Student[];
    totalPage: number;
    totalStudent: number
}

// Định nghĩa dữ liệu gửi đi
interface ApiStudentRequest {
    pageId: number;
    pageSize: number;
    searchName: string | null;
    sort: SortQuery
}

// Định nghĩa kiểu State
interface StudentState {
    student: Student[];
    pageId: number;
    pageSize: number;
    searchName: string;
    sort: SortQuery;
    totalPage: number;
    totalStudent: number;
    loading: boolean;
    error: string | null;
    pagination: number[];
    selectedStudent: string
}

const initialState: StudentState = {
    student: [],
    pageId: 1,
    pageSize: 20,
    searchName: "",
    sort: {
        name: "",
        classId: "",
        dateOfBirth: "",
        major: "",
        _id: ""
    },
    selectedStudent: "1",
    pagination: [],
    totalPage: 0,
    totalStudent: 0,
    loading: false,
    error: null
}

// Định nghĩa Payload cập nhật Sort
interface UpdateSortFieldPayload {
    field: keyof SortQuery;
    value: "asc" | "desc" | "";
}
const token = localStorage.getItem("accessToken") ?? "";

export const getStudent = createAsyncThunk<
    ApiStudentRespond,
    ApiStudentRequest,
    { rejectValue: string }
>(
    "student/getStudent",
    async (
        { pageId, pageSize, searchName, sort },
        { rejectWithValue }
    ) => {
        try {
            const res = await get(
                "student",
                { pageId, pageSize, searchName: searchName ?? "", sort: JSON.stringify(sort) },
                { baseURL: "http://localhost:3000/api",token })

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu học sinh thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu học sinh thất bại")
        }
    }
)

const getStudentSlice = createSlice({
    name: "getStudent",
    initialState,
    reducers: {
        setPagination: (state, action) => {
            state.pagination = action.payload
        },
        setPageId: (state, action) => {
            state.pageId = action.payload
        },
        setSelectedStudent: (state, action) => {
            state.selectedStudent = action.payload
        },
        setSearchName: (state, action) => {
            state.searchName = action.payload
        },
        setSortField: (state, action: PayloadAction<UpdateSortFieldPayload>) => {
            const { field, value } = action.payload
            state.sort[field] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.student = action.payload.data
                state.totalPage = action.payload.totalPage
                state.totalStudent = action.payload.totalStudent
            })
            .addCase(getStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { setPagination, setPageId, setSelectedStudent, setSearchName, setSortField } = getStudentSlice.actions
export default getStudentSlice.reducer