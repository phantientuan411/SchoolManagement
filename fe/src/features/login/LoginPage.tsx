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
    <div className="flex gap-5 bg-white rounded-xl items-center overflow-hidden shadow-xl w-[80vw]">
      <img className="w-[60%]" src="https://res.cloudinary.com/du9onbxav/image/upload/v1765746831/Screenshot_2025-12-15_021337_cbbfx3.png" alt="" />

      <div className=" main_login flex flex-col items-center justify-center text-center w-[40%]">
        <h2 className="login-title p-5 pt-20 text-3xl font-bold">Login account</h2>
        <form className="flex flex-col gap-5 justify-center items-center w-full" onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading} className="btn-login w-6/10 h-8 font-semibold p-5 flex justify-center items-center">
            {loading ? "Logining..." : "LOGIN"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{'Lỗi server'}</p>}
      </div>

    </div>

  );
}
