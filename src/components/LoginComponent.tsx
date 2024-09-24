import React, { useEffect, useState, useContext } from "react";
import { loginUser } from "../services/LoginService";
import { listCourse } from "../services/AdminService";
import { listStudents } from "../services/StudentService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const message = localStorage.getItem("message");
  // const { setAuth } = useContext(AuthContext);
  //const { setAuth } = useAuth();

  const navigator = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const userDto = { email, password };
    let message = "";
    let role = "";
    let status = true;
    let accessToken = "";

    if (validateForm()) {
      //add await before calling loginUser

      await loginUser(userDto)
        .then((response: any) => {
          message = response.data.message;
          role = response.data.role;
          status = response.data.status;
          //accessToken = JSON.stringify(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);

          //accessToken = response.data.token;
          //setAuth(accessToken);
        })
        .catch((error: any) => {
          console.log(error);
        });

      localStorage.setItem("message", " ");
      // await delay(2000);

      if (status) {
        if (role === "ADMIN") {
          navigator(`/adminDashboard/${email}`);
        } else if (role === "INSTRUCTOR") {
          navigator(`/instructorDashboard/${email}`);
        } else if (role === "STUDENT") {
          navigator(`/studentDashboard/${email}`);
        }
      } else {
        alert(message);
      }
    }
  };

  function handleRegistration() {
    console.log("register");
    navigator("/register");
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email Id is required";
      valid = false;
    }

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div style={{ backgroundColor: "#d4eef2", height: "700px" }}>
      <br />
      <br />
      <br />
      <br />
      <p style={{ color: "red", textAlign: "center" }}>{message}</p>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <br></br>

        <br></br>
        <div className="card" style={{ width: "400px" }}>
          <br />
          <h3 className="text-center">Login / Register</h3>
          <div className="card-body">
            <p className="card-text">
              Welcome to HSI Learning Management System.
              <br /> Please login with your credentials. <br />
              <p>
                <br />
                If you are new to HSI, please click on the <i>Register</i>
                button.
              </p>
            </p>
            <form>
              <label className="form-label">Email Id</label>
              <input
                type="text"
                name="email"
                value={email}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={(event: any) => setEmail(event.target.value)}
              ></input>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}

              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                onChange={(event: any) => setPassword(event.target.value)}
              ></input>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <br />
              <br />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <button
                className="btn btn-primary"
                style={{
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  float: "right",
                }}
                onClick={handleRegistration}
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

export default LoginComponent;
