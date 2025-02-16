import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { validateLogin } from "../service/queries";
import styles from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const hashedPassword = CryptoJS.SHA1(password).toString();
      const user = await validateLogin(username, hashedPassword);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/tasks");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again. " + err);
    }
  };

  return (
    <div className={styles.login}>
      <h1 data-testid="login-header">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username-input"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <div className={styles.messagePlaceholder}>
          {error && <div className={styles.error} data-testid="error-message">{error}</div>}
        </div>
        <button type="submit" data-testid="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
