import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Student, Teacher } from "../../type/user";
import { del, get, patch } from "../../axios/ultil.tsx";

//Định nghĩa kiểu dữ liệu gửi đi
interface ApiUserRequest {
    id: string
}

// Định nghĩa kiểu dữ liệu trả về
interface ApiUserResponse {
    data: Student[] | Teacher[]
}

// Định nghĩa kiểu dữ liệu update Student
interface UpdateStudent {
    name: string;
    address: string;
    gender: string
    parentPhone: string;
    parentName: string;
    status: boolean;
    dateOfBirth: string;
}

// Định nghĩa kiểu dữ liệu update Teacher
interface UpdateTeacher {
    name: string;
    address: string;
    gender: string;
    status: boolean;
    dateOfBirth: string;
    degree: string;
    major: string;
}

// Định nghĩa dữ liệu update Student gửi đi
interface ApiUpdateStudentRequest {
    id: string
    updateStudent: UpdateStudent
}

// Định nghĩa kiểu dữ liệu update Teacher gửi đi
interface ApiUpdateTeacherRequest {
    id: string;
    updateTeacher: UpdateTeacher
}

// Định nghĩa kiểu state
interface UserInfoState {
    data: Student[] | Teacher[]
    id: string
    updateStudent: UpdateStudent
    updateTeacher: UpdateTeacher
    loading: boolean
    error: string | null
    edit: boolean
}

const initialState: UserInfoState = {
    id: "",
    data: [],
    loading: false,
    error: null,
    updateStudent: {
        name: "",
        address: "",
        gender: "",
        parentPhone: "",
        parentName: "",
        status: true,
        dateOfBirth: ""
    },
    updateTeacher: {
        name: "",
        address: "",
        gender: "",
        status: true,
        dateOfBirth: "",
        degree: "",
        major: ""
    },
    edit: false

}

export const getUserInfo = createAsyncThunk<
    ApiUserResponse,
    ApiUserRequest,
    { rejectValue: string }
>(
    "userInfo/getUserInfo",
    async ({ id }, { rejectWithValue }

    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                `userinfo/${id}`,
                {},
                {
                    
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu giáo viên thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu giáo viên thất bại")
        }
    }
)

export const updateStudentApi = createAsyncThunk<
    ApiUserResponse,
    ApiUpdateStudentRequest,
    { rejectValue: string }
>(
    "userInfo/upDateStudent",
    async (
        { id, updateStudent },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await patch(
                `student/update/${id}`,
                updateStudent,
                {
                    
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu giáo viên thất bại")
            } else {
                window.location.reload()
                return res.data
            }


        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu giáo viên thất bại")
        }
    }
)

export const updateTeacherApi = createAsyncThunk<
    ApiUserResponse,
    ApiUpdateTeacherRequest,
    { rejectValue: string }
>(
    "userInfo/updateTeacher",
    async (
        { id, updateTeacher },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await patch(
                `teacher/update/${id}`,
                updateTeacher,
                {
                    
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu giáo viên thất bại")
            } else {
                window.location.reload()
                return res.data
            }

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)

export const deleteUserInfoApi = createAsyncThunk<
    ApiUserResponse,
    ApiUserRequest,
    { rejectValue: string }
>(
    "userInfo/deleteUserInfo",
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
                `userinfo/${id}`,
                {
                    
                    token: accessToken ?? undefined
                }
            )

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu giáo viên thất bại")
            } else {
                window.location.reload()
                return res.data
            }

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)

const getUserInfoSlice = createSlice({
    name: "getUserInfo",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        // Update Student
        setNameStudentUpdate: (state, action) => {
            state.updateStudent.name = action.payload
        },
        setAddressStudentUpdate: (state, action) => {
            state.updateStudent.address = action.payload
        },
        setGenderStudentUpdate: (state, action) => {
            state.updateStudent.gender = action.payload
        },
        setParentNameStudentUpdate: (state, action) => {
            state.updateStudent.parentName = action.payload
        },
        setParentPhoneStudentUpdate: (state, action) => {
            state.updateStudent.parentPhone = action.payload
        },
        setStatusStudentUpdate: (state, action) => {
            state.updateStudent.status = action.payload === "true"
        },
        setDoBStudentUpdate: (state, action) => {
            state.updateStudent.dateOfBirth = action.payload
        },
        // Update Teacher
        setNameTeacherUpdate: (state, action) => {
            state.updateTeacher.name = action.payload
        },
        setAddressTeacherUpdate: (state, action) => {
            state.updateTeacher.address = action.payload
        },
        setGenderTeacherUpdate: (state, action) => {
            state.updateTeacher.gender = action.payload
        },
        setDegreeTeacherUpdate: (state, action) => {
            state.updateTeacher.degree = action.payload
        },
        setStatusTeacherUpdate: (state, action) => {
            state.updateTeacher.status = action.payload === "true"
        },
        setDoBTeacherUpdate: (state, action) => {
            state.updateTeacher.dateOfBirth = action.payload
        },
        setMajorTeacherUpdate: (state, action) => {
            state.updateTeacher.major = action.payload
        },

        setEdit: (state, action) => {
            state.edit = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.data = action.payload.data
                // Update Student
                state.updateStudent.name = action.payload.data[0].name
                state.updateStudent.address = action.payload.data[0].address
                state.updateStudent.gender = action.payload.data[0].gender
                state.updateStudent.parentName = (action.payload.data[0] as Student).parentName
                state.updateStudent.parentPhone = (action.payload.data[0] as Student).parentPhone
                state.updateStudent.status = action.payload.data[0].status
                state.updateStudent.dateOfBirth = action.payload.data[0].dateOfBirth
                // Update Teacher
                state.updateTeacher.name = action.payload.data[0].name
                state.updateTeacher.address = action.payload.data[0].address
                state.updateTeacher.gender = action.payload.data[0].gender
                state.updateTeacher.degree = (action.payload.data[0] as Teacher).degree
                state.updateTeacher.status = action.payload.data[0].status
                state.updateTeacher.dateOfBirth = action.payload.data[0].dateOfBirth
                state.loading = false
                state.error = null
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export const { setEdit, setId,
    setAddressStudentUpdate, setDoBStudentUpdate, setGenderStudentUpdate, setNameStudentUpdate, setParentNameStudentUpdate, setParentPhoneStudentUpdate, setStatusStudentUpdate,
    setAddressTeacherUpdate, setDoBTeacherUpdate, setGenderTeacherUpdate, setNameTeacherUpdate, setDegreeTeacherUpdate, setStatusTeacherUpdate, setMajorTeacherUpdate }
    = getUserInfoSlice.actions

export default getUserInfoSlice.reducer