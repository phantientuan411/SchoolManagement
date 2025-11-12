import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interface from "../Interface.tsx";
import LoginInterface from "../features/login/loginInterface.tsx";
import HomePage from "../features/homePage/HomePage.tsx";
import ListStudentPage from "../features/listStudent/ListStudentPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInterface />} />
        <Route path="/home" element={<Interface><HomePage /></Interface>} />
        <Route path="/student" element={<Interface><ListStudentPage/></Interface>}/>
      </Routes>


    </Router>
  )
}

export default AppRouter