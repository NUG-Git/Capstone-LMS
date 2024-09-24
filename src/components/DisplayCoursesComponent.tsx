import React, { useEffect, useState } from "react";
import { deleteCourse, listCourse } from "../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const DisplayCoursesComponent = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const navigator = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    getAllCourses();
  }, []);

  function getAllCourses() {
    listCourse()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewCourse() {
    navigator("/createCourse");
  }

  function updateCourse(courseId: any) {
    navigator(`/updateCourse/${courseId}`);
  }

  function manageFile(courseId: any) {
    navigator(`/manageAssignment/${courseId}`);
  }

  function deleteThisCourse(courseId: any) {
    deleteCourse(courseId)
      .then((response) => {
        getAllCourses();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <div className="container">
        <br />
        <br />
        <br />
        <h2 className="text-center">List of Courses</h2>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={addNewCourse}
        >
          Add New Course
        </button>
        <br />
        <br />
        <table className="table table-info table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Course Duration</th>
              <th>Assignment File</th>
              <th>Update</th>
              <th>Assignment File</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.duration}</td>
                <td>{course.assignmentFileName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => updateCourse(course.courseId)}
                  >
                    Update Course
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => manageFile(course.courseId)}
                  >
                    Upload/Reload Assignment File
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteThisCourse(course.courseId)}
                  >
                    Delete Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayCoursesComponent;
