import { signUp } from "../../utils/axios";
import "./SignUp.scss";
import { useEffect, useState } from "react";

export default function SignUp({ isSignUpOpen, handleCloseSignUp }) {
  const [username, setUsername] = useState("");
  const [colour, setColour] = useState("lightpink"); // use the first colour in the select input
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (!username) {
      return alert("Please enter a username.");
    }

    if (!password) {
      return alert("Please enter a password.");
    }

    if (!colour) {
      return alert("Please choose a colour.");
    }

    try {
      const response = await signUp(username, password, colour);
      alert(
        "User created successfully. Please log in to get started.",
        response.message
      );
      handleCloseSignUp(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isSignUpOpen) return null;

  return (
    <div className="signup-overlay" onClick={handleCloseSignUp}>
      <div
        className="signup-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="signup-overlay__button-close"
          onClick={handleCloseSignUp}
        >
          &times;
        </button>
        <h1 className="signup-overlay__h1">Sign Up</h1>
        <form className="signup-overlay-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="signup-overlay-form__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <select
            id="colour"
            name="colour"
            className="signup-overlay-form__input"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
          >
            <option value="lightpink">lightpink</option>
            <option value="darkseagreen">darkseagreen</option>
            <option value="gold">gold</option>
            <option value="teal">teal</option>
            <option value="cornflowerblue">cornflowerblue</option>
            <option value="tomato">tomato</option>
            <option value="lightgrey">lightgrey</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            className="signup-overlay-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="signup-overlay-form__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="signup-overlay-form__button"
            onClick={handleSignUp}
          >
            Submit
          </button>
        </form>
        <div className="signup-overlay__feedback">
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
