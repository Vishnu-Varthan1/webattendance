import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface Props {
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // demo auth: replace with real API call later
    if (username && password) {
      localStorage.setItem("token", "demo-token");
      setIsLogged(true);
      navigate("/attendance");
    } else {
      alert("Enter username and password (demo)");
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="login-form">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
  
};

export default Login;
