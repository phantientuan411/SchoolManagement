import {BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import LoginInterface from "../features/login/loginInterface.tsx";
import HomePage from "../features/homePage/HomePage.tsx";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginInterface />}/>
            <Route path="/home" element={<HomePage />}/>
        </Routes>


    </Router>
  )
}

export default AppRouter