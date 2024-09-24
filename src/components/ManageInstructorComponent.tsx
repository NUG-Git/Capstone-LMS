import React, { useEffect, useState } from "react";
import { listInstructors, updateInstructor } from "../services/AdminService";
import { deleteInstructor } from "../services/AdminService";
import { useNavigate } from "react-router-dom";

const ManageInstructorComponent = () => {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [instructorId, setInstructorId] = useState(0);
  const [instructorName, setInstructorName] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    getAllInstructors();
  }, []);

  const getAllInstructors = async () => {
    await listInstructors()
      .then((response: any) => {
        setInstructors(response.data);
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          localStorage.setItem(
            "message",
            "Sorry you are timed out!! Please log in again."
          );
          navigator("/login");
        }
        console.error(error);
      });
  };

  function saveInstructor(instructorId: any, instructorName: any, email: any) {
    console.log("inside save method");
    setInstructorName(instructorName);
    setEmail(email);
    const instructorDto = { instructorId, instructorName, email };
    console.log(instructorDto);
    updateInstructor(instructorId, instructorDto)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    setInstructorId(0);
  }

  const handleUpdate = (insId: any) => {
    setInstructorId(insId);
    console.log(insId);
    listInstructors();
  };

  function deleteThisInstructor(id: any) {
    deleteInstructor(id)
      .then((response) => {
        console.log(response.data);
        getAllInstructors();
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
        <h5>Manage Instructors</h5>
        <div className="container">
          <div className="container">
            <h3 className="text-center">List of Instructors</h3>
            <table className="table table-info table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>Instructor ID</th>
                  <th>Instructor Name</th>
                  <th>Email</th>
                  <th>Update Details</th>
                  <th>Delete Instructor</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructor) =>
                  instructor.instructorId === instructorId ? (
                    <tr key={instructor.instructorId}>
                      <td>{instructor.instructorId}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={instructor.instructorName}
                          onChange={(e) =>
                            (instructor.instructorName = e.target.value)
                          }
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={instructor.email}
                          onChange={(e) => (instructor.email = e.target.value)}
                        ></input>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() =>
                            saveInstructor(
                              instructor.instructorId,
                              instructor.instructorName,
                              instructor.email
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
                          onClick={() =>
                            deleteThisInstructor(instructor.instructorId)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={instructor.instructorId}>
                      <td>{instructor.instructorId}</td>
                      <td>{instructor.instructorName}</td>
                      <td>{instructor.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => handleUpdate(instructor.instructorId)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() =>
                            deleteThisInstructor(instructor.instructorId)
                          }
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

export default ManageInstructorComponent;
