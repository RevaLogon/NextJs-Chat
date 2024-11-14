// src/components/Login/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const { setAuth } = useAuth(); // Correctly uses the context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setAuth({ username, role: "admin" });
      navigate("/admin");
    } else if (username === "user" && password === "user") {
      setAuth({ username, role: "user" });
      navigate("/chat");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
