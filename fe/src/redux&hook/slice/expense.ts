import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../axios/ultil";

export interface Expense {
    _id?: string;
    type: "electricity" | "water" | "internet" | "maintenance" | "rent" | "other";
    amount: number;
    month: number;
    year: number;
    paid: boolean;
    paidDate?: string;
    note?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TotalAmountExpense {
    month: number;
    year: number;
    totalAmount: number;
}

interface ApiExpenseRequest {
    pageIdExpense: number;
    pageSizeExpense: number;
}


interface ApiExpenseResponse {
    data: Expense[];
    totalPageExpense: number;
    totalExpense: number;
    totalAmountExpense: TotalAmountExpense[]; // ✅ ĐÃ ĐỔI
}

interface ExpenseState {
    expense: Expense[];
    pageIdExpense: number;
    pageSizeExpense: number;
    loading: boolean;
    totalPageExpense: number;
    totalExpense: number;
    totalAmountExpense: TotalAmountExpense[]; // ✅ ĐÃ ĐỔI
    error: string | null;
    paginationExpense: number[];
}

const initialState: ExpenseState = {
    expense: [],
    pageIdExpense: 1,
    pageSizeExpense: 5,
    paginationExpense: [],
    totalPageExpense: 0,
    totalExpense: 0,
    totalAmountExpense: [],
    loading: false,
    error: null
};

export const getExpense = createAsyncThunk<
    ApiExpenseResponse,
    ApiExpenseRequest,
    { rejectValue: string }
>(
    "expense/getExpense",
    async ({ pageIdExpense, pageSizeExpense }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const res = await get(
                "expense",
                { pageIdExpense, pageSizeExpense },
                {
                    baseURL: "http://localhost:3000/api",
                    token: accessToken ?? undefined
                }
            );

            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu expense thất bại");
            }

            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.message || "Lấy dữ liệu expense thất bại"
            );
        }
    }
);

const getExpenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setPaginationExpense: (state, action) => {
            state.paginationExpense = action.payload;
        },
        setPageIdExpense: (state, action) => {
            state.pageIdExpense = action.payload;
        },
        setPageSizeExpense: (state, action) => {
            state.pageSizeExpense = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.expense = action.payload.data;
                state.totalPageExpense = action.payload.totalPageExpense;
                state.totalExpense = action.payload.totalExpense;
                state.totalAmountExpense = action.payload.totalAmountExpense; // ✅
            })
            .addCase(getExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setPageIdExpense,
    setPaginationExpense,
    setPageSizeExpense
} = getExpenseSlice.actions;

export default getExpenseSlice.reducer;
