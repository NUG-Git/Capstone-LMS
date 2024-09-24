import React, { useEffect, useState } from "react";
import {
  createCourse,
  getCourse,
  updateCourse,
} from "../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const CourseComponent = () => {
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");

  // To check if its the create request or update request.
  //Update request will contain a course id
  const { courseId } = useParams();

  const [errors, setErrors] = useState({
    courseName: "",
    duration: "",
  });

  useEffect(() => {
    if (courseId) {
      getCourse(courseId)
        .then((response) => {
          setCourseName(response.data.courseName);
          setDuration(response.data.duration);
        })
        .catch((error) => console.error(error));
    }
  }, [courseId]);

  const navigator = useNavigate();

  const saveOrUpdateCourse = (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      const course = { courseName, duration };
      console.log(course);
      // follows update procedure if courseId is present
      if (courseId) {
        updateCourse(courseId, course)
          .then((response) => {
            console.log(response.data);
            navigator("/courseManagement");
          })
          .catch((error) => console.log(error));
      } else {
        createCourse(course)
          .then((response) => {
            console.log(response.data);
            navigator("/courseManagement");
          })
          .catch((error) => console.log(error));
      }
    }
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (courseName.trim()) {
      errorsCopy.courseName = "";
    } else {
      errorsCopy.courseName = "Course name is required";
      valid = false;
    }

    if (duration) {
      errorsCopy.duration = "";
    } else {
      errorsCopy.duration = "Duration is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  // Change the page title btw create course and update course based on the user request
  function pageTitle() {
    if (courseId) {
      return <h2 className="text-center">Update Course</h2>;
    } else {
      return <h2 className="text-center">Add Course</h2>;
    }
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  placeholder="Enter course name"
                  name="courseName"
                  value={courseName}
                  className={`form-control ${
                    errors.courseName ? "is-invalid" : ""
                  }`}
                  onChange={(event: any) => setCourseName(event.target.value)}
                ></input>
                {errors.courseName && (
                  <div className="invalid-feedback">{errors.courseName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  placeholder="Enter course duration in months"
                  name="duration"
                  value={duration}
                  className={`form-control ${
                    errors.duration ? "is-invalid" : ""
                  }`}
                  onChange={(event: any) => setDuration(event.target.value)}
                ></input>
                {errors.duration && (
                  <div className="invalid-feedback">{errors.duration}</div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateCourse}>
                Save Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
