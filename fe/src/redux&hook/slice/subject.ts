import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get, post, patch, del } from "../../axios/ultil";
import type { Subject } from "../../type/user";

// Kiểu dữ liệu edit
interface EditSubject {
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}

// Kiểu dữ liệu thêm mới
interface NewSubject {
    majorId: string;
    subjectCode: string;
    subjectName: string;
    numberCredits: number;
    totalFee: number;
}

//Định nghĩa class study detail
interface ClassStudyDetail {
    _id: string
    classCode: string
    teacherId: string
    subjectId: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    dateOfWeek: string
}

//Định nghĩa subject detail
export interface SubjectDetail {
    _id: string
    majorId: string
    subjectCode: string
    subjectName: string
    numberCredits: number
    totalFee: number
    classstudy: ClassStudyDetail[]
}


// Định nghĩa dữ liệu gửi đi Subject Detail 
interface ApiSubjectDetailRequest {
    id: string
}

interface ApiSubjectDetailResponse {
    data: SubjectDetail[]

}

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
    subjectEqualMajor: SubjectEqualMajorState
    subjectDetail: SubjectDetail[]
    majorId: string
    loading: boolean
    error: string | null
    newSubject: NewSubject;
    editSubject: EditSubject;
    selectedSubject: string
}

const initialState: SubjectState = {
    subjectEqualMajor: {},
    subjectDetail: [],
    majorId: "",
    loading: false,
    error: null,
    newSubject: {
        majorId: "",
        subjectCode: "",
        subjectName: "",
        numberCredits: 0,
        totalFee: 0,
    },
    editSubject: {
        subjectCode: "",
        subjectName: "",
        numberCredits: 0,
        totalFee: 0,
    },
    selectedSubject: ""
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

export const getSubjectDetail = createAsyncThunk<
    ApiSubjectDetailResponse,
    ApiSubjectDetailRequest,
    { rejectValue: string }
>(
    "subject/getSubjectDetail",
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
                `subject/${id}`,
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

export const postSubject = createAsyncThunk(
    "subject/postSubject",
    async (newSubject: NewSubject, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await post("subject", newSubject, { baseURL: "http://localhost:3000/api", token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Thêm mới thất bại");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Thêm mới thất bại");
        }
    }
);


export const patchSubject = createAsyncThunk(
    "subject/patchSubject",
    async ({ id, editSubject }: { id: string; editSubject: EditSubject }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await patch(`subject/${id}`, editSubject, { baseURL: "http://localhost:3000/api", token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Cập nhật thất bại");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Cập nhật thất bại");
        }
    }
);


export const delSubject = createAsyncThunk(
    "subject/delSubject",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await del(`subject/${id}`, { baseURL: "http://localhost:3000/api", token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Xóa thất bại");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Xóa thất bại");
        }
    }
)
const getSubjectSlice = createSlice({
    name: "getSubject",
    initialState,
    reducers: {
        newMajorId: (state, action) => { state.newSubject.majorId = action.payload },
        newSubjectCode: (state, action) => { state.newSubject.subjectCode = action.payload },
        newSubjectName: (state, action) => { state.newSubject.subjectName = action.payload },
        newNumberCredits: (state, action) => { state.newSubject.numberCredits = action.payload },
        newTotalFee: (state, action) => { state.newSubject.totalFee = action.payload },
        resetNewSubject: (state) => {
            state.newSubject = { majorId: "", subjectCode: "", subjectName: "", numberCredits: 0, totalFee: 0 };
        },
        editSubjectCode: (state, action) => { state.editSubject.subjectCode = action.payload },
        editSubjectName: (state, action) => { state.editSubject.subjectName = action.payload },
        editNumberCredits: (state, action) => { state.editSubject.numberCredits = action.payload },
        editTotalFee: (state, action) => { state.editSubject.totalFee = action.payload },
        resetEditSubject: (state) => {
            state.editSubject = { subjectCode: "", subjectName: "", numberCredits: 0, totalFee: 0 };
        },

        setSelectedSubject: (state, action) => {
            state.selectedSubject = action.payload
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
            .addCase(getSubjectDetail.fulfilled, (state, action) => {
                state.subjectDetail = action.payload.data
                state.loading = false
                state.error = null
            })
    },
})

export const { newMajorId, newSubjectCode, newSubjectName, newNumberCredits, newTotalFee, resetNewSubject,
    editSubjectCode, editSubjectName, editNumberCredits, editTotalFee, resetEditSubject, setSelectedSubject } = getSubjectSlice.actions

export default getSubjectSlice.reducer