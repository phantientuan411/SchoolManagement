import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Student, Teacher } from "../../type/user";
import { get, patch } from "../../axios/ultil.tsx";

//Định nghĩa kiểu dữ liệu gửi đi
interface ApiUserRequest {
    id: string
    role: "teacher" | "student" | ""
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

// Định nghĩa dữ liệu update gửi đi
interface ApiUpdateStudentRequest {
    id: string
    updateStudent: UpdateStudent
}

// Định nghĩa kiểu state
interface UserInfoState {
    data: Student[] | Teacher[]
    id: string
    role: "student" | "teacher" | ""
    updateStudent: UpdateStudent
    loading: boolean
    error: string | null
    edit: boolean
}

const initialState: UserInfoState = {
    id: "",
    role: "",
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
    edit: false

}

export const getUserInfo = createAsyncThunk<
    ApiUserResponse,
    ApiUserRequest,
    { rejectValue: string }
>(
    "userInfo/getUserInfo",
    async ({ id, role }, { rejectWithValue }

    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }

            const res = await get(
                `userinfo/${id}`,
                { role },
                {
                    baseURL: "http://localhost:3000/api",
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
                    baseURL: "http://localhost:3000/api",
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

const getUserInfoSlice = createSlice({
    name: "getUserInfo",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
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
            state.updateStudent.status = action.payload
        },
        setDoBStudentUpdate: (state, action) => {
            state.updateStudent.dateOfBirth = action.payload
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
                state.updateStudent.name = action.payload.data[0].name
                state.updateStudent.address = action.payload.data[0].address
                state.updateStudent.gender = action.payload.data[0].gender
                state.updateStudent.parentName = (action.payload.data[0] as Student).parentName
                state.updateStudent.parentPhone = (action.payload.data[0] as Student).parentPhone
                state.updateStudent.status = action.payload.data[0].status
                state.updateStudent.dateOfBirth = action.payload.data[0].dateOfBirth
                state.loading = false
                state.error = null
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },

})

export const { setEdit, setId, setRole, setAddressStudentUpdate, setDoBStudentUpdate, setGenderStudentUpdate, setNameStudentUpdate, setParentNameStudentUpdate, setParentPhoneStudentUpdate, setStatusStudentUpdate } = getUserInfoSlice.actions

export default getUserInfoSlice.reducer