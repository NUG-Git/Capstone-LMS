import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findStudent } from "../services/StudentService";
import axios from "axios";

const StudentGradeDisplayComponent = () => {
  const { email } = useParams();
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [grade, setGrade] = useState(0);
  const [emailId, setEmailId] = useState();

  useEffect(() => {
    console.log(email);

    const userDto = { email };
    console.log(userDto);
    findStudent(userDto).then((response) => {
      setStudentId(response.data.studentId);
      setStudentName(response.data.studentName);
      setCourseEnrolled(response.data.courseName);
      setGrade(response.data.grade);
      setEmailId(response.data.email);
    });
  }, [email]);

  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body ">
            <form>
              <div className="form-group mb-2">
                <h2>Welcome {studentName} !!</h2>
                <br />
                <label className="form-label">
                  <b>Student Name</b> : &nbsp;&nbsp;&nbsp;&nbsp;{studentName}
                </label>
                <br />
                <label className="form-label">
                  <b>Email</b> : &nbsp;&nbsp;&nbsp;&nbsp;{emailId}
                </label>
                <br />
                <label className="form-label">
                  <b>Course Enrolled</b> : &nbsp;&nbsp;&nbsp;&nbsp;
                  {courseEnrolled}
                </label>
                <br />
                <label className="form-label">
                  <b>Grade</b> : &nbsp;&nbsp;&nbsp;&nbsp;{grade}
                </label>
                <br />
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentGradeDisplayComponent;
