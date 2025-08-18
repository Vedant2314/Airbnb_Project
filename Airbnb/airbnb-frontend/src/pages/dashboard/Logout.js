import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    alert("You have been logged out.");
    navigate("/login");
  }, [navigate, setIsLoggedIn]);

  return null;
};

export default Logout;
