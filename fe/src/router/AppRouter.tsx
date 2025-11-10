import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginInterface from "../features/login/loginInterface.tsx";
import HomePage from "../features/homePage/HomePage.tsx";
import ListStudentPage from "../features/listStudent/ListStudentPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInterface />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/student" element={<ListStudentPage></ListStudentPage>}></Route>
      </Routes>


    </Router>
  )
}

export default AppRouter