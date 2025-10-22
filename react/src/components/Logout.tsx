import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout: React.FC<{ setIsLogged: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsLogged }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
