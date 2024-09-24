import "./App.css";
import AdminFooterComponent from "./components/AdminFooterComponent";
import AdminHeaderComponent from "./components/AdminHeaderComponent";
import CourseComponent from "./components/CourseComponent";
import DisplayCoursesComponent from "./components/DisplayCoursesComponent";
import StudentGradingComponent from "./components/StudentGradingComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeComponent from "./components/WelcomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import StudentComponent from "./components/StudentComponent";
import AssignmentComponent from "./components/AssignmentComponent";
import AdminDashboardComponent from "./components/AdminDashboardComponent";
import InstructorDashboardComponent from "./components/InstructorDashboardComponent";
import StudentDashboardComponent from "./components/StudentDashboardComponent";
import ManageInstructorComponent from "./components/ManageInstructorComponent";
import StudentReportComponent from "./components/StudentReportComponent";
import ManageStudentComponent from "./components/ManageStudentComponent";
import StudentGradeDisplayComponent from "./components/StudentGradeDisplayComponent";
import LogoutComponent from "./components/LogoutComponent";
import axios from "axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <AdminHeaderComponent />
        <Routes>
          {/*  http://localhost:5173/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
          {/*  http://localhost:5173/logout */}
          <Route path="/logout" element={<LogoutComponent />}></Route>
          {/*  http://localhost:5173/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>

          {/* http://localhost:5173/admin */}
          <Route path="/admin" element={<DisplayCoursesComponent />}></Route>

          {/*  http://localhost:5173/courseManagement */}
          <Route
            path="/courseManagement"
            element={<DisplayCoursesComponent />}
          ></Route>

          {/*  http://localhost:5173/createCourse */}
          <Route path="/createCourse" element={<CourseComponent />}></Route>

          {/*  http://localhost:5173/updateCourse */}
          <Route
            path="/updateCourse/:courseId"
            element={<CourseComponent />}
          ></Route>
          {/*  http://localhost:5173/grading */}
          <Route path="/grading" element={<StudentGradingComponent />}></Route>
          {/*  http://localhost:5173/welcome */}
          <Route path="/welcome" element={<WelcomeComponent />}></Route>

          {/*  http://localhost:5173/student */}
          <Route path="/student/:email" element={<StudentComponent />}></Route>

          {/*  http://localhost:5173/manageAssignment */}
          <Route
            path="/manageAssignment/:courseId"
            element={<AssignmentComponent />}
          ></Route>
          {/*  http://localhost:5173/adminDashboard */}
          <Route
            path="/adminDashboard/:email"
            element={<AdminDashboardComponent />}
          ></Route>
          {/*  http://localhost:5173/adminDashboard */}
          <Route
            path="/instructorDashboard/:email"
            element={<InstructorDashboardComponent />}
          ></Route>
          {/*  http://localhost:5173/adminDashboard */}
          <Route
            path="/studentDashboard/:email"
            element={<StudentDashboardComponent />}
          ></Route>
          {/*  http://localhost:5173/manageInstructor */}
          <Route
            path="/manageInstructor"
            element={<ManageInstructorComponent />}
          ></Route>
          {/*  http://localhost:5173/manageStudent */}
          <Route
            path="/manageStudent"
            element={<ManageStudentComponent />}
          ></Route>
          {/*  http://localhost:5173/manageStudent */}
          <Route
            path="/viewGrade/:email"
            element={<StudentGradeDisplayComponent />}
          ></Route>
          {/*  http://localhost:5173/report */}
          <Route path="/reports" element={<StudentReportComponent />}></Route>
        </Routes>
        <AdminFooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
