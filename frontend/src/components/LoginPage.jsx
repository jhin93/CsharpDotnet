// src/components/LoginPage.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Login failed");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default LoginPage;