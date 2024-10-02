import "./SignUp.scss";
import { useState } from "react";

export default function SignUp({ isSignUpOpen, handleCloseSignUp }) {
  const [username, setUsername] = useState("");
  const [colour, setColour] = useState("pink");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, colour }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
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
            <option value="aquamarine">aquamarine</option>
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
      </div>
    </div>
  );
}
