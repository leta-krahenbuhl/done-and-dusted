import "./InitialIcon.scss";
import { useState, useEffect } from "react";
import { fetchUserandColour } from "../../utils/axios";

export default function InitialIcon({ username, dailyTaskComponent }) {
  const [colour, setColour] = useState("");
  const [error, setError] = useState(null);

  // // Get user's colour
  useEffect(() => {
    const fetchColour = async () => {
      const habitant = username;

      setError(null);

      try {
        await fetchUserandColour(habitant, setColour, setError);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchColour();
  }, [username]);

  // Get the initial of the username
  const userInitial = username ? username.charAt(0).toUpperCase() : "";

  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={dailyTaskComponent ? "initial-icon-small" : "initial-icon"}
      style={{ backgroundColor: colour || "pink" }}
    >
      {userInitial}
    </div>
  );
}
