import "./InitialIcon.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InitialIcon({ username, dailyTaskComponent }) {
  const [colour, setColour] = useState("");

  // Get all user's colour
  useEffect(() => {
    // Fetch user
    axios
      .get("/api/users/colour", {
        params: { username },
      })
      .then((response) => {
        const userData = response.data[0]; // Access the first element of the array
        setColour(userData.colour); // Set the colour state
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, []);

  // Get the initial of the username
  const userInitial = username ? username.charAt(0).toUpperCase() : "";

  return (
    <div
      className={dailyTaskComponent ? "initial-icon-small" : "initial-icon"}
      style={{ backgroundColor: colour || "pink" }}
    >
      {userInitial}
    </div>
  );
}
