import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeaderComponent = () => {
  const navigator = useNavigate();

  function handleLogin() {
    navigator("/logout");
  }
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <span>
            <h3>HSI Learning Management System</h3>
          </span>
          <a
            color="#ffffff"
            className="navbar-brand"
            href="#"
            onClick={handleLogin}
          >
            Logout
          </a>
        </nav>
      </header>
    </div>
  );
};

export default AdminHeaderComponent;
