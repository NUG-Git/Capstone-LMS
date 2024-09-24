import React, { useEffect, useState } from "react";
import { listStudents } from "../services/StudentService";
import { deleteStudent, updateStudent } from "../services/StudentService";
import { useNavigate } from "react-router-dom";

const ManageStudentComponent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [studentId, setStudentId] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
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
        if (error.response.status === 401) {
          localStorage.setItem(
            "message",
            "Sorry you are timed out!! Please log in again."
          );
          navigator("/login");
        }
        console.error(error);
      });
  }

  function saveStudent(studentId: any, studentName: any, email: any) {
    setStudentName(studentName);
    setEmail(email);
    const studentDto = { studentId, studentName, email };
    console.log(studentDto);
    updateStudent(studentId, studentDto)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    setStudentId(0);
  }
  const handleUpdate = (studentId: any) => {
    setStudentId(studentId);
    console.log(studentId);
    listStudents();
  };

  function deleteThisStudent(id: any) {
    deleteStudent(id)
      .then((response) => {
        console.log(response.data);
        getAllStudents();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div style={{ backgroundColor: "#d4eef2", height: "700px" }}>
      <br />
      <br />
      <br />
      <div>
        <h3>Admin Dashboard </h3>
        <h5>Manage Students</h5>
        <div className="container">
          <div className="container">
            <h3 className="text-center">List of Students</h3>
            <table className="table table-info table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Course Name</th>
                  <th>Grade</th>
                  <th>Update Details</th>
                  <th>Delete Student</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) =>
                  student.studentId === studentId ? (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={student.studentName}
                          onChange={(e) =>
                            (student.studentName = e.target.value)
                          }
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={student.email}
                          onChange={(e) => (student.email = e.target.value)}
                        ></input>
                      </td>
                      <td>{student.courseName}</td>
                      <td>{student.grade}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() =>
                            saveStudent(
                              student.studentId,
                              student.studentName,
                              student.email
                            )
                          }
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteThisStudent(student.studentId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>{student.studentName}</td>
                      <td>{student.email}</td>
                      <td>{student.courseName}</td>
                      <td>{student.grade}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => handleUpdate(student.studentId)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteThisStudent(student.studentId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentComponent;
