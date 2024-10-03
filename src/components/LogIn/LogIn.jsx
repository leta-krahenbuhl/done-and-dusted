import "./LogIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../utils/axios";

export default function LogIn({ isLogInOpen, handleCloseLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);

    if (!username) {
      return alert("Please enter your username.");
    }

    if (!password) {
      return alert("Please enter your password.");
    }

    try {
      const data = await logIn(username, password);
      localStorage.setItem("token", data.token);

      navigate("/home");
    } catch (error) {
      // Show a user-friendly message
      alert(error.message);
      // setError(error.message);
    }
  };

  if (!isLogInOpen) return null;

  return (
    <div className="login-overlay" onClick={handleCloseLogIn}>
      <div
        className="login-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="login-overlay__button-close"
          onClick={handleCloseLogIn}
        >
          &times;
        </button>
        <h1 className="login-overlay__h1">Log In</h1>
        <form className="login-overlay-form" onSubmit={handleLogin}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="login-overlay-form__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="login-overlay-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-overlay-form__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
