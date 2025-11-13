// src/redux/auth/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { post, get } from "../../axios/ultil.tsx";
// ---- Types ----
interface LoginResponse {
  user: any;               // thông tin user từ /me
  accessToken: string;     // token dùng cho API khác
  refreshToken: string;    // token để refresh
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// ---- Initial state ----
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// ---- Async thunk login ----
export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string; dispatch: any}>(
  "account/login",

  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Gọi API login
      const res = await post<{ accessToken: string; refreshToken: string }>("/account/login", { email, password });

      if (!res.ok || !res.data) {
        return rejectWithValue(res.error || "Đăng nhập thất bại");
      }

      const { accessToken, refreshToken } = res.data;
      console.log(refreshToken);

      const meRes = await get("/me", undefined, { token: accessToken });
      if (!meRes.ok || !meRes.data) {
        return rejectWithValue(meRes.error || "Lấy thông tin user thất bại");
      }
      localStorage.setItem("user", JSON.stringify(meRes.data));
      return { user: meRes.data, accessToken, refreshToken };
    } catch (error: any) {
      return rejectWithValue(error.message || "Đăng nhập thất bại");
    }
  }
);

// ---- Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
