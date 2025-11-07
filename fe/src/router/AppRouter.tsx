import {BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import LoginInterface from "../features/login/loginInterface";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginInterface />}/>

        </Routes>


    </Router>
  )
}

export default AppRouter