import "./AddHome.scss";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AddHome({ isAddHomeOpen, handleCloseAddHome }) {
  const [homeName, setHomeName] = useState("");
  const [admins, setAdmins] = useState([]);
  const [habitants, setHabitants] = useState([]);

  const handleAddHome = async (e) => {
    e.preventDefault();

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Decode the token to get the username
    let username = "";
    if (token) {
      const decoded = jwtDecode(token);
      username = decoded.username; // Access the username from the decoded token
      //   console.log("username:", username); // works!
      setAdmins(admins.push(username));
      setHabitants(habitants.push(username));
    }

    // const habitants = username;
    // const admins = username;
    // console.log("habitants/admins:", admins); //works

    if (!homeName) {
      return alert("Please enter a name for your home.");
    }

    try {
      const response = await fetch("/api/add-home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ homeName, habitants, admins }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("New home created successfully.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
