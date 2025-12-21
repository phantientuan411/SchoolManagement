import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil";

// Định nghĩa dữ liệu total amount
interface totalAmountInvestment {
    _id: null
    totalAmount: number
}

// Định nghĩa dữ liệu investment
interface Investment {
    _id?: string;       // MongoDB tự tạo
    amount: number;     // Số tiền tài trợ
    donor: string;      // Tên nhà tài trợ
    date: Date;       // Ngày nhận tài trợ (ISO string)
    note?: string;      // Ghi chú (không bắt buộc)
    completed: boolean; // Trạng thái đã nhận hay chưa
    createdAt?: string; // Timestamp tạo bản ghi
    updatedAt?: string;
}

// Định nghĩa dữ liệu gửi đi
interface ApiInvestmentRequest {
    pageId: number;
    pageSize: number;
}

// Định nghĩa dữ liệu trả về
interface ApiInvestmentResponse {
    data: Investment[];
    totalPage: number;
    totalStudent: number
    totalAmountInvestment: totalAmountInvestment[]
}

// Định nghĩa kiểu State
interface InvestmentState {
    investment: Investment[];
    pageId: number;
    pageSize: number;
    loading: boolean;
    totalPage: number;
    totalInvestment: number;
    totalAmountInvestment: totalAmountInvestment[]
    error: string | null;
    pagination: number[];

}

const initialState: InvestmentState = {
    investment: [],
    pageId: 1,
    pageSize: 5,
    pagination: [],
    totalPage: 0,
    totalInvestment: 0,
    totalAmountInvestment: [],
    loading: false,
    error: null
}

export const getInvestment = createAsyncThunk<
    ApiInvestmentResponse,
    ApiInvestmentRequest,
    { rejectValue: string }
>(
    "investment/getInvestment",
    async (
        { pageId, pageSize },
        { rejectWithValue }
    ) => {
        try {
            const accessToken = localStorage.getItem("accessToken")

            if (!accessToken) {
                console.log("Chưa đăng nhập")
            }
            console.log(accessToken)

            const res = await get(
                "investment",
                { pageId, pageSize },
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

const getInvestmentSlice = createSlice({
    name: "getInvestment",
    initialState,
    reducers: {
        setPagination: (state, action) => {
            state.pagination = action.payload
        },
        setPageId: (state, action) => {
            state.pageId = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvestment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInvestment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.investment = action.payload.data
                state.totalPage = action.payload.totalPage
                state.totalInvestment = action.payload.totalStudent
                state.totalAmountInvestment = action.payload.totalAmountInvestment
            })
            .addCase(getInvestment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { setPageId, setPagination } = getInvestmentSlice.actions

export default getInvestmentSlice.reducer