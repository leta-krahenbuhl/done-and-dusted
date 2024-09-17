import "./AddHome.scss";
import { useState } from "react";

export default function AddHome({ isAddHomeOpen, handleCloseAddHome }) {
  const [homeName, setHomeName] = useState("");

  const handleAddHome = async (e) => {
    //     e.preventDefault();
    //     if (!homeName) {
    //       return alert("Please enter a name for your home.");
    //     }
    //     if (admin.length < 1) {
    //       return alert("Please enter an admin.");
    //     }
    //     try {
    //       const response = await fetch("/api/signup", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ username, password }),
    //       });
    //       const data = await response.json();
    //       if (response.ok) {
    //         alert("New user created successfully. Log in to start!");
    //       } else {
    //         alert(data.message);
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
  };

  if (!isAddHomeOpen) return null;

  return (
    <div className="add-home-overlay" onClick={handleCloseAddHome}>
      <div
        className="add-home-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-home-overlay__button-close"
          onClick={handleCloseAddHome}
        >
          &times;
        </button>
        <h1 className="add-home-overlay__h1">Add a Home</h1>
        <form className="add-home-overlay-form" onSubmit={handleAddHome}>
          <input
            type="text"
            placeholder="Home name"
            className="add-home-overlay-form__input"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="add-home-overlay-form__button"
            onClick={handleAddHome}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
