import React, { useEffect, useState } from "react";
import { listStudents } from "../services/StudentService";
import { updateGrade } from "../services/StudentService";
import { useNavigate } from "react-router-dom";

const StudentGradingComponent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [updateId, setUpdateId] = useState(0);
  const [grade, setGrade] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleBack() {
    navigator("/instructorDashboard");
  }

  const handleUpdate = (studentId: any) => {
    setUpdateId(studentId);
    console.log(studentId);
    listStudents();
  };

  const saveGrade = (studentId: any, grade: any) => {
    console.log(studentId, grade);
    updateGrade(studentId, grade)
      .then((res) => listStudents())
      .catch((er) => console.log(er));
    setUpdateId(0);
  };
  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <br />
      <br />
      <br />
      <h2 className="text-center">List of students</h2>

      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student email</th>
            <th>Evaluate Assignment</th>
            <th>Grade</th>
            <th>Update Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            student.studentId === updateId ? (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.email}</td>
                <td>{student.fileName}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={student.grade}
                    onChange={(e) => (student.grade = e.target.value)}
                  ></input>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => saveGrade(student.studentId, student.grade)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.email}</td>
                <td>{student.fileName}</td>
                <td>{student.grade}</td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdate(student.studentId)}
                  >
                    Update Grade
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGradingComponent;
