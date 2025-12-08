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
import ListMajorPage from "../features/listMajor/ListMajorPage.tsx";
import CreateMajor from "../features/createMajor/CreateMajor.tsx";
import EditMajor from "../features/editMajor/EditMajor.tsx";
import AddTimeTable from "../features/calendar/newCalendar.tsx";
import MangeMajor from "../features/manageMajor/MangeMajor.tsx";
import ListClassMajor from "../features/listClassMajor/ListClassMajor.tsx";
import ListSubject from "../features/listSubject/ListSubject.tsx";
import ListClassStudy from "../features/listClassStudy/ListClassStudy.tsx";
import FinancePage from "../features/finance/financePage.tsx";
import ClassRoom from "../features/classRoom/ClassRoom.tsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInterface />} />
        <Route path="/home" element={<Interface><HomePage /></Interface>} />
        <Route path="/new" element={<Interface><NewPost></NewPost></Interface>} />
        <Route path="/student" element={<Interface><ListStudentPage /></Interface>} />
        <Route path="/teacher" element={<Interface><ListTeacherPage></ListTeacherPage></Interface>}></Route>
        <Route path="/userinfo/:id" element={<Interface><UserInfoPage></UserInfoPage></Interface>} ></Route>
        <Route path="/createaccount" element={<Interface><NewAccountPage></NewAccountPage></Interface>}></Route>
        <Route path="/manageMajor" element={<Interface><MangeMajor></MangeMajor></Interface>}></Route>
        <Route path="/majorDetails/:id" element={<Interface><ListMajorPage></ListMajorPage></Interface>}></Route>
        <Route path="/classMajorDetails/:id" element={<Interface><ListClassMajor></ListClassMajor></Interface>}></Route>
        <Route path="/subjectDetails/:id" element={<Interface><ListSubject></ListSubject></Interface>}></Route>
        <Route path="/classStudyDetails/:id" element={<Interface><ListClassStudy></ListClassStudy></Interface>}></Route>
        <Route path="/majorEdit" element={<Interface><EditMajor></EditMajor></Interface>}></Route>
        <Route path="/majorCreate" element={<Interface><CreateMajor></CreateMajor></Interface>}></Route>
        <Route path="/calendar" element={<Interface><Calendar></Calendar></Interface>}></Route>
        <Route path="/calendar/add" element={<Interface><AddTimeTable></AddTimeTable></Interface>} />
        <Route path="/finance" element={<Interface><FinancePage></FinancePage></Interface>}></Route>
        <Route path="/classRoom" element={<Interface><ClassRoom></ClassRoom></Interface>}></Route>
      </Routes>


    </Router>
  )
}

export default AppRouter