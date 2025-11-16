import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { jwtDecode } from 'jwt-decode'
import { post } from "../axios/ultil";
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
interface JwtPayload {
  exp: number;
}

export const refreshAccess = (accessToken: string) => {
  if (!accessToken) return;

  const token = accessToken;

  const { exp } = jwtDecode<JwtPayload>(token);
  const now = Date.now() / 1000;

  let timeLeft = (exp - now - 30) * 1000;

  // Nếu timeLeft nhỏ hơn 0 → refresh ngay
  if (timeLeft <= 0) timeLeft = 0;

  console.log("Auto refresh sau:", timeLeft, "ms");

  const timer = setTimeout(() => {
    post("/refresh-token", {})
      .then((res) => {
        const newToken = res.data.accessToken ?? "";

        // lưu token mới
        localStorage.setItem("accessToken", newToken);

        // tiếp tục refresh token mới
        refreshAccess(newToken);
      })
      .catch((err) => {
        console.log("Refresh thất bại:", err);
      });
  }, timeLeft);

  return timer;
};