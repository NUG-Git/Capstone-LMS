import React from "react";
import instructor from "../assets/instructor.jpg";
import student from "../assets/student.jpg";
import report from "../assets/report.jpg";
import { useNavigate } from "react-router-dom";

const AdminDashboardComponent = () => {
  const navigator = useNavigate();
  function handleInstructorInfo() {
    navigator("/manageInstructor");
  }
  function handleStudentInfo() {
    navigator("/manageStudent");
  }
  function handleReports() {
    navigator("/reports");
  }
  return (
    <div style={{ backgroundColor: "#d4eef2" }}>
      <br />
      <br />
      <br />
      <h4>Welcome to Admin Dashboard</h4>
      <br />

      <div className="containerD">
        <div className="column1">
          <div className="card">
            <img src={instructor} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Manage Instructor</h5>
              <p className="card-text">
                Approve instructors and monitor instructor details.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleInstructorInfo}
              >
                Manage Instructors
              </button>
            </div>
          </div>
        </div>
        <div className="column2">
          <div className="card">
            <img src={student} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Manage Student</h5>
              <p className="card-text">
                Approve students and monitor student details.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStudentInfo}
              >
                Manage Students
              </button>
            </div>
          </div>
        </div>
        <div className="column3">
          <div className="card">
            <img src={report} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Student Report</h5>
              <p className="card-text">Generate and view student reports.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReports}
              >
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default AdminDashboardComponent;
