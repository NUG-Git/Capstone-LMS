import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const navigator = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigator("/login");
  }, []);
  return <div>LogoutComponent</div>;
};

export default LogoutComponent;
