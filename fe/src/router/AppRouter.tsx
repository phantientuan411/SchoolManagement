import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interface from "../Interface.tsx";
import LoginInterface from "../features/login/loginInterface.tsx";
import HomePage from "../features/homePage/HomePage.tsx";
import ListStudentPage from "../features/listStudent/ListStudentPage";
import ListTeacherPage from "../features/listTeacher/ListTeacherPage.tsx";
import UserInfoPage from "../features/userInfo/UserInfoPage.tsx";
import NewAccountPage from "../features/newAccount/NewAccountPage.tsx";
import NewPost from "../features/homePage/NewPost.tsx";
import Calendar from "../features/calendar/calendar.tsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInterface />} />
        <Route path="/home" element={<Interface><HomePage /></Interface>} />
        <Route path="/new" element={<Interface><NewPost></NewPost></Interface>}/>
        <Route path="/student" element={<Interface><ListStudentPage /></Interface>} />
        <Route path="/teacher" element={<Interface><ListTeacherPage></ListTeacherPage></Interface>}></Route>
        <Route path="/userinfo/:id" element={<Interface><UserInfoPage></UserInfoPage></Interface>} ></Route>
        <Route path="/createaccount" element={<Interface><NewAccountPage></NewAccountPage></Interface>}></Route>
        <Route path="/calendar" element={<Calendar></Calendar>}></Route>
      </Routes>


    </Router>
  )
}

export default AppRouter