import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeComponent = () => {
  const navigator = useNavigate();

  function handleRegistration() {
    console.log("register");
    navigator("/register");
  }
  function handleLogin() {
    navigator("/login");
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="card border-primary col-md-6 offset-md-4 offset-md-4">
        <div className="card-body">
          <form>
            <h5 className="card-title">HSI Learning Management System</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Login/Register
            </h6>
            <p className="card-text">
              Welcome to HSI Learning Management System. If you are new, please
              register. Else please login to proceed.
            </p>
            <div className="form-group mb-2">
              <button
                className="btn btn-primary"
                style={{ marginRight: "1rem", marginLeft: "1rem" }}
                onClick={handleRegistration}
              >
                Register
              </button>

              <button
                className="btn btn-primary"
                style={{ marginRight: "1rem", marginLeft: "1rem" }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
