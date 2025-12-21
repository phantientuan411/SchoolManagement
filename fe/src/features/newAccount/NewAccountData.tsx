import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../axios/ultil";

// Định nghĩa dữ liệu create account
interface CreateAccount {
    accountName: string;
    accountEmail: string;
    accountPassword: string;
    role: string;
    major: string;
    classMajor: string
}
// Định nghĩa dữ liệu gửi đi
interface ApiCreateAccountRequest {
    createAccount: CreateAccount
}

// Định nghĩa dữ liệu trả về
interface ApiCreateAccountResponse {

}

// Định nghĩa State ban đầu
interface CreateAccountState {
    createAccount: CreateAccount;
    loading: boolean;
    error: string | null
}

const initialState: CreateAccountState = {
    createAccount: {
        accountName: "",
        accountEmail: "",
        accountPassword: "",
        role: "",
        major: "",
        classMajor: ""
    },
    loading: false,
    error: null
}

export const createAccountApi = createAsyncThunk<
    ApiCreateAccountResponse,
    ApiCreateAccountRequest,
    { rejectValue: string }
>(
    "account/createAccount",
    async (
        { createAccount },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }
            console.log(accessToken)

            const res = await post(
                "account/signUp",
                createAccount,
                {
                    
                    token: accessToken ?? undefined
                })

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu học sinh thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu học sinh thất bại")
        }
    }
)

const createAccountSlice = createSlice({
    name: "createAccount",
    initialState,
    reducers: {
        setAccountName: (state, action) => {
            state.createAccount.accountName = action.payload
        },
        setAccountEmail: (state, action) => {
            state.createAccount.accountEmail = action.payload
        },
        setAccountPassword: (state, action) => {
            state.createAccount.accountPassword = action.payload
        },
        setRole: (state, action) => {
            state.createAccount.role = action.payload
        },
        setMajor: (state, action) => {
            state.createAccount.major = action.payload
        },
        setClassMajor: (state, action) => {
            state.createAccount.classMajor = action.payload
        },
        resetCreateAccount: (state) => {
            state.createAccount.accountName = "";
            state.createAccount.accountEmail = "";
            state.createAccount.accountPassword = "";
            state.createAccount.role = "";
            state.createAccount.major = "";
            state.createAccount.classMajor = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccountApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAccountApi.fulfilled, (state) => {
                state.loading = false
                state.error = null
            })
            .addCase(createAccountApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },

})

export const { resetCreateAccount, setClassMajor, setMajor, setAccountEmail, setAccountName, setAccountPassword, setRole } = createAccountSlice.actions

export default createAccountSlice.reducer