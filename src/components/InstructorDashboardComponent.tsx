import React from "react";
import grade from "../assets/grade.jpg";
import course from "../assets/course.jpg";
import { useNavigate } from "react-router-dom";

const InstructorDashboardComponent = () => {
  const navigator = useNavigate();
  function handleCourseInfo() {
    navigator("/courseManagement");
  }

  function handleGrading() {
    navigator("/grading");
  }
  return (
    <div style={{ backgroundColor: "#d4eef2" }}>
      <br />
      <br />
      <br />
      <h4>Welcome to Instructor Dashboard</h4>
      <br />

      <div className="containerD">
        <div className="column1">
          <div className="card">
            <img src={course} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Manage Course</h5>
              <p className="card-text">
                Manage courses by creating and updating courses and uploading
                assignment files for the courses.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCourseInfo}
              >
                Manage Courses
              </button>
            </div>
          </div>
        </div>
        <div className="column2">
          <div className="card">
            <img src={grade} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Manage Grading</h5>
              <p className="card-text">
                Assess the assignments submitted by students and grade student
                performance.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGrading}
              >
                Manage Grading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardComponent;
