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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className="initial-icon"
        style={{ backgroundColor: colour || "pink" }}
      >
        {userInitial}
      </div>
    </>
  );
}
