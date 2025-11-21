import "./App.css"
import AppRouter from "./router/AppRouter"
import { useEffect } from "react";
import { refreshAccess } from "./redux&hook/hook";

const App = () => {
  useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    refreshAccess(token);
  }
}, []);

  return (
    <>
      <AppRouter/>
    </>


  )
}

export default App