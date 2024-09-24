import React, { useEffect, useState } from "react";
import { registerUser } from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import { getCourseNames } from "../services/AdminService";

const RegisterComponent = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [enrolledCourse, setEnrolledCourse] = useState("");
  const [message, setMessage] = useState("");
  const navigator = useNavigate();
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    email: "",
    role: "",
    enrolledCourse: "",
  });
  const [courses, setCourses] = useState<any[]>([]);
  let options = null;

  useEffect(() => {
    getCourseNames()
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function validateRegistration() {
    setMessage("");
    let valid = true;
    const errorsCopy = { ...errors };
    if (userName.trim()) {
      errorsCopy.userName = "";
    } else {
      errorsCopy.userName = "User name is required";
      valid = false;
    }

    console.log("UserName valid :" + valid);

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Emaid id is required";
      valid = false;
    }

    console.log("email valid :" + valid);

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      valid = false;
    }

    console.log("password valid :" + valid);

    if (role.trim()) {
      errorsCopy.role = "";
    } else {
      errorsCopy.role = "Role is required";
      valid = false;
    }

    console.log("role valid :" + valid);

    if (role === "STUDENT") {
      console.log(enrolledCourse + "...");
      if (enrolledCourse.trim()) {
        errorsCopy.enrolledCourse = "";
      } else {
        errorsCopy.enrolledCourse = "Course is required";
        valid = false;
      }
    }

    setErrors(errorsCopy);
    console.log("valid : " + valid);

    return valid;
  }

  function reset() {
    setUserName("");
    setPassword("");
    setEmail("");
    setRole("");
  }

  function saveUser(event: any) {
    event.preventDefault();

    if (validateRegistration()) {
      const userDto = { userName, email, password, role, enrolledCourse };
      console.log(userName, email, password, role, enrolledCourse);
      registerUser(userDto)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // setMessage(
      //   "Registration Successful!! Please login with the credentials to access the system."
      // );
      // reset();

      navigator("/login");
    }
  }

  function handleRole(event: any) {
    setRole(event.target.value);
  }

  function handleOptions() {
    if (role === "STUDENT") {
      if (courses) {
        return (
          <p>
            <label className="form-label">Enroll in a Course</label>
            <select
              aria-label="select example"
              name="role"
              value={enrolledCourse}
              onChange={(event) => setEnrolledCourse(event.target.value)}
              className="form-select"
            >
              <option value=""></option>
              {courses.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>
          </p>
        );
      } else {
        return;
      }
    }
    return;
  }

  return (
    <div style={{ backgroundColor: "#d4eef2", height: "700px" }}>
      <br />
      <br />
      <br />
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <br />
        <br />
        <div className="card" style={{ width: "400px", height: "600px" }}>
          <h2 className="text-center">Registration Form</h2>
          <div className="card-body">
            <form>
              <h4 style={{ color: "green" }}>{message}</h4>
              <label className="form-label">User Name</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(event: any) => setUserName(event.target.value)}
                className={`form-control ${
                  errors.userName ? "is-invalid" : ""
                }`}
              ></input>
              {errors.userName && (
                <div className="invalid-feedback">{errors.userName}</div>
              )}

              <label className="form-label">Email Id</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              ></input>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}

              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event: any) => setPassword(event.target.value)}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              ></input>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}

              <label className="form-label">Role</label>
              <select
                aria-label="select example"
                name="role"
                value={role}
                onChange={handleRole}
                className={`form-select ${errors.role ? "is-invalid" : ""}`}
              >
                <option value=""></option>
                <option value="ADMIN">ADMIN</option>
                <option value="INSTRUCTOR">INSTRUCTOR</option>
                <option value="STUDENT">STUDENT</option>
              </select>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
              <div>
                <span>{handleOptions()}</span>
              </div>
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={saveUser}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
