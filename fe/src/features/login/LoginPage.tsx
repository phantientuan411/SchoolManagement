import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux&hook/hook.ts";
import { login } from "./LoginData.tsx";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setAccountEmail] = useState("");
  const [password, setAccountPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }; 
  
  return (
    <div className=" main_login w-8/10 h-5/10 flex flex-col items-center text-center">
      <h2 className="login-title p-5 pt-20 text-3xl">Đăng nhập tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setAccountEmail(e.target.value)}
          className="w-9/10 h-12 p-2.5 mb-2.5 mt-5"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setAccountPassword(e.target.value)}
          className="w-9/10 h-12 p-2.5 mb-2.5"
          required
        />
        <button type="submit" disabled={loading} className="btn-login w-6/10 h-8 font-semibold pl-auto  pr-auto">
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{'Lỗi server'}</p>}
    </div>
  );
}
