
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post, patch, del } from "../../axios/ultil.tsx";
import type { ClassMajor, Teacher } from "../../type/user.ts";

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

interface ClassMajorDetail {
    _id: string
    classCode: string
    className: string
    teacherId: string
    majorId: string
    year: number
    student: StudentDetails[]
    teacher: Teacher[]
}

// Định nghĩa dữ liệu gửi đi 
interface ApiClassMajorRequest {
    selected: string
}

// Định nghĩa dữ liệu trả về
interface ApiClassMajorResponse {
    data: ClassMajor[]
}

// Định nghĩa dữ liệu gửi đi Class Major Detail
interface ApiClassMajorDetailRequest {
    id: string
}

// Định nghĩa dữ liệu trả về Class Major Detail
interface ApiClassMajorDetailResponse {
    data: ClassMajorDetail[]
}

// Dữ liệu gửi đi khi tạo mới
interface NewClassMajor {
    classCode: string;
    className: string;
    teacherId: string;
    majorId: string;
    year: number;
}

// Dữ liệu gửi đi khi edit
interface EditClassMajor {
    classCode: string;
    className: string;
    teacherId: string;
    year: number;
}

// Định nghĩa kiểu state
interface ClassMajorState {
    classMajor: ClassMajor[]
    allMajor: ClassMajor[]
    classMajorDetail: ClassMajorDetail[]
    loading: boolean
    error: string | null
    newClassMajor: NewClassMajor
    editClassMajor: EditClassMajor
    selectedClassMajor: string
}

// Định nghĩa state ban đầu
const initialState: ClassMajorState = {
    classMajor: [],
    allMajor: [],
    classMajorDetail: [],
    loading: false,
    error: null,
    newClassMajor: {
        classCode: "",
        className: "",
        teacherId: "",
        majorId: "",
        year: 0
    },
    editClassMajor: {
        classCode: "",
        className: "",
        teacherId: "",
        year: 0
    },
    selectedClassMajor: ""
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

export const getClassMajorDetail = createAsyncThunk<
    ApiClassMajorDetailResponse,
    ApiClassMajorDetailRequest,
    { rejectValue: string }
>(
    "classMajor/getClassMajorDetail",
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
                `classmajor/${id}`,
                {},
                {
                    
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

export const postClassMajor = createAsyncThunk<void, { newClassMajor: NewClassMajor }, { rejectValue: string }>(
    "classMajor/newClassMajor",
    async ({ newClassMajor }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await post("classmajor", newClassMajor, {  token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Thêm mới thất bại");
        } catch (error: any) {
            return rejectWithValue(error.message || "Thêm mới thất bại");
        }
    }
);

export const patchClassMajor = createAsyncThunk<void, { id: string; editClassMajor: EditClassMajor }, { rejectValue: string }>(
    "classMajor/editClassMajor",
    async ({ id, editClassMajor }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await patch(`classmajor/${id}`, editClassMajor, {  token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Sửa thất bại");
        } catch (error: any) {
            return rejectWithValue(error.message || "Sửa thất bại");
        }
    }
);

export const delClassMajor = createAsyncThunk<void, { id: string }, { rejectValue: string }>(
    "classMajor/deleteClassMajor",
    async ({ id }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await del(`classmajor/${id}`, {  token: accessToken ?? undefined });
            if (!res.ok) return rejectWithValue(res.error || "Xóa thất bại");
        } catch (error: any) {
            return rejectWithValue(error.message || "Xóa thất bại");
        }
    }
)

const getClassMajorSlice = createSlice({
    name: "getClassMajor",
    initialState,
    reducers: {
        setNewClassCode: (state, action) => { state.newClassMajor.classCode = action.payload; },
        setNewClassName: (state, action) => { state.newClassMajor.className = action.payload; },
        setNewTeacherId: (state, action) => { state.newClassMajor.teacherId = action.payload; },
        setNewMajorId: (state, action) => { state.newClassMajor.majorId = action.payload; },
        setNewYear: (state, action) => { state.newClassMajor.year = action.payload; },
        resetNewClassMajor: (state) => { state.newClassMajor = { classCode: "", className: "", teacherId: "", majorId: "", year: 0 }; },
        setEditClassCode: (state, action) => { state.editClassMajor.classCode = action.payload; },
        setEditClassName: (state, action) => { state.editClassMajor.className = action.payload; },
        setEditTeacherId: (state, action) => { state.editClassMajor.teacherId = action.payload; },
        setEditYear: (state, action) => { state.editClassMajor.year = action.payload; },
        resetEditClassMajor: (state) => { state.editClassMajor = { classCode: "", className: "", teacherId: "", year: 0 }; },
        setSelectedClassMajor: (state, action) => {
            state.selectedClassMajor = action.payload
        }
    },
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
            .addCase(getClassMajorDetail.fulfilled, (state, action) => {
                state.classMajorDetail = action.payload.data
                state.loading = false
                state.error = null
            })
    },
})

export const { setSelectedClassMajor, setNewClassCode, setNewClassName, setNewTeacherId, setNewMajorId, setNewYear, resetNewClassMajor,
    setEditClassCode, setEditClassName, setEditTeacherId, setEditYear, resetEditClassMajor } = getClassMajorSlice.actions

export default getClassMajorSlice.reducer