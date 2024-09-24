import React from "react";
import assignment from "../assets/assignment.jpg";
import sgrade from "../assets/sgrade.jpg";
import { useNavigate, useParams } from "react-router-dom";

const StudentDashboardComponent = () => {
  const navigator = useNavigate();
  const { email } = useParams();
  function viewGrade() {
    navigator(`/viewGrade/${email}`);
  }
  function submitAssignment() {
    navigator(`/student/${email}`);
  }
  return (
    <div style={{ backgroundColor: "#d4eef2" }}>
      <br />
      <br />
      <br />
      <h4>Welcome to Student Dashboard</h4>
      <br />

      <div className="containerD">
        <div className="column1">
          <div className="card">
            <img src={assignment} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">Submit Assignment</h5>
              <p className="card-text">Submit assignment file.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitAssignment}
              >
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
        <div className="column2">
          <div className="card">
            <img src={sgrade} className="card-img-top" alt="#" />
            <div className="card-body">
              <h5 className="card-title">View Grade</h5>
              <p className="card-text">View grade and performance feedback.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={viewGrade}
              >
                View Grade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardComponent;
