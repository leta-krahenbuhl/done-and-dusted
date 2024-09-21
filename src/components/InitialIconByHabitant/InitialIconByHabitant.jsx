import "./InitialIconByHabitant.scss";
import { useState, useEffect } from "react";
import { fetchUser } from "../../utils/axios";

export default function InitialIconByHabitant({ habitant }) {
  const [colour, setColour] = useState("");
  const [error, setError] = useState(null);

  // Get user's colour
  useEffect(() => {
    fetchUser(habitant, setColour, setError);
  }, []);

  // Get the initial of the username
  const userInitial = habitant ? habitant.charAt(0).toUpperCase() : "";

  return (
    <>
      <div
        className="initial-icon"
        style={{ backgroundColor: colour || "pink" }}
      >
        {userInitial}
      </div>
      <div>{error ? <p>{error}</p> : <p>Colour: {colour}</p>}</div>
    </>
  );
}
