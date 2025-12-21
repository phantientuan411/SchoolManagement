import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {  ClassStudy, Mark } from "../../type/user";
import { del, get, patch, post } from "../../axios/ultil";

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

// Định nghĩa dữ liệu new
interface NewClassStudy {
    classCode: string
    teacherId: string
    subjectId: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    dateOfWeek: string
}

// Định nghĩa dữ liệu gửi đi new
interface ApiNewClassStudyRequest {
    newClassStudy: NewClassStudy

}

// Định nghĩa dữ liệu edit
interface EditClassStudy {
    classCode: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    dateOfWeek: string
}

// Định nghĩa kiểu dữ liệu gửi đi edit
interface ApiEditClassStudyRequest {
    id: string
    editClassStudy: EditClassStudy
}

// Định nghĩa Student Detail
interface StudentDetail {
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

// Định nghĩa Class Student Detail
interface ClassStudentDetail {
    _id: string
    studentId: StudentDetail
    classStudyId: ClassStudy
    mark: Mark
    status: "Pass" | "Fail" | "Studying"
}

// Định nghĩa dữ liệu trả về Class Study Detail
interface ApiClassStudyDetailResponse {
    data: ClassStudy[]
    student: ClassStudentDetail[]
}

// Định nghĩa dữ liệu Class theo Subject
interface ClassStudyEqualSubject {
    [key: string]: ClassStudy[]
}

// Định nghĩa state ban đầu
interface ClassStudyState {
    classStudy: ClassStudy[]
    classStudyDetail: ClassStudy[]
    studentDetail: ClassStudentDetail[]
    totalClass: number
    loading: boolean
    error: string | null
    classStudyEqualSubject: ClassStudyEqualSubject
    subjectId: string
    newClassStudy: NewClassStudy
    editClassStudy: EditClassStudy
    edited: string
}

const initialState: ClassStudyState = {
    classStudy: [],
    classStudyDetail: [],
    studentDetail: [],
    totalClass: 0,
    loading: false,
    error: null,
    classStudyEqualSubject: {},
    subjectId: "",
    newClassStudy: {
        classCode: "",
        teacherId: "",
        subjectId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        dateOfWeek: ""
    },
    editClassStudy: {
        classCode: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        dateOfWeek: ""
    },
    edited: ""
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

export const getClassStudyDetail = createAsyncThunk<
    ApiClassStudyDetailResponse,
    ApiClassStudyRequest,
    { rejectValue: string }
>(
    "classStudy/getClassStudyDetail",
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
                `classstudy/${id}`,
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

export const postClassStudy = createAsyncThunk<
    ApiClassStudyResponse,
    ApiNewClassStudyRequest,
    { rejectValue: string }
>(
    "classStudy/newClassStudy",
    async (
        { newClassStudy },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await post(
                `classstudy`,
                newClassStudy,
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

export const delClassStudy = createAsyncThunk<
    ApiClassStudyResponse,
    ApiClassStudyRequest,
    { rejectValue: string }
>(
    "classStudy/delClassStudy",
    async (
        { id },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await del(
                `classstudy/${id}`,
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

export const patchClassStudy = createAsyncThunk<
    ApiClassStudyResponse,
    ApiEditClassStudyRequest,
    { rejectValue: string }
>(
    "classStudy/patchClassStudy",
    async (
        { id, editClassStudy },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await patch(
                `classstudy/${id}`,
                editClassStudy,
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

const getClassStudySlice = createSlice({
    name: "getClassStudy",
    initialState,
    reducers: {
        newClassCode: (state, action) => {
            state.newClassStudy.classCode = action.payload
        },
        newTeacherId: (state, action) => {
            state.newClassStudy.teacherId = action.payload
        },
        newSubject: (state, action) => {
            state.newClassStudy.subjectId = action.payload
        },
        newStartDate: (state, action) => {
            state.newClassStudy.startDate = action.payload
        },
        newEndDate: (state, action) => {
            state.newClassStudy.endDate = action.payload
        },
        newStartTime: (state, action) => {
            state.newClassStudy.startTime = action.payload
        },
        newEndTime: (state, action) => {
            state.newClassStudy.endTime = action.payload
        },
        newDateOfWeek: (state, action) => {
            state.newClassStudy.dateOfWeek = action.payload
        },
        resetNewClassStudy: (state) => {
            state.newClassStudy.classCode = ""
            state.newClassStudy.teacherId = ""
            state.newClassStudy.subjectId = ""
            state.newClassStudy.startDate = ""
            state.newClassStudy.endDate = ""
            state.newClassStudy.startTime = ""
            state.newClassStudy.endTime = ""
            state.newClassStudy.dateOfWeek = ""
        },
        editClassCode: (state, action) => {
            state.editClassStudy.classCode = action.payload
        },
        editStartDate: (state, action) => {
            state.editClassStudy.startDate = action.payload
        },
        editEndDate: (state, action) => {
            state.editClassStudy.endDate = action.payload
        },
        editStartTime: (state, action) => {
            state.editClassStudy.startTime = action.payload
        },
        editEndTime: (state, action) => {
            state.editClassStudy.endTime = action.payload
        },
        editDateOfWeek: (state, action) => {
            state.editClassStudy.dateOfWeek = action.payload
        },
        setEdited: (state, action) => {
            state.edited = action.payload
        },
        resetEditClassStudy: (state) => {
            state.editClassStudy.classCode = ""
            state.editClassStudy.startDate = ""
            state.editClassStudy.endDate = ""
            state.editClassStudy.startTime = ""
            state.editClassStudy.endTime = ""
            state.editClassStudy.dateOfWeek = ""
        },
        resetClassStudyDetail: (state) => {
            state.studentDetail = []
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
            .addCase(getClassStudyDetail.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.classStudyDetail = action.payload.data
                state.studentDetail = action.payload.student
            })
            .addCase(postClassStudy.fulfilled, (state, action) => {
                state.classStudy = action.payload.data
                state.totalClass = action.payload.totalClass
                state.loading = false
                state.error = null
            })
            .addCase(delClassStudy.fulfilled, (state, action) => {
                state.classStudy = action.payload.data
                state.totalClass = action.payload.totalClass
                state.loading = false
                state.error = null
            })
            .addCase(patchClassStudy.fulfilled, (state, action) => {
                state.classStudy = action.payload.data
                state.totalClass = action.payload.totalClass
                state.loading = false
                state.error = null
            })
    },
})

export const { newClassCode, newTeacherId, newSubject, newStartDate, newEndDate,
    newEndTime, newStartTime, newDateOfWeek, resetNewClassStudy,
    editClassCode, editDateOfWeek, editEndDate, editEndTime, editStartDate, editStartTime, resetEditClassStudy, setEdited, resetClassStudyDetail
} = getClassStudySlice.actions

export default getClassStudySlice.reducer