import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux&hook/hook.ts";
import { Login } from "./LoginData.tsx";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.login);

  const [email, setAccountEmail] = useState("");
  const [password, setAccountPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(Login({ email, password }));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setAccountEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setAccountPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <p style={{ color: "green" }}>Xin chào {user.account.email}!</p>}
    </div>
  );
}
