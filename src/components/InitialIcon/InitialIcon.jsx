import "./InitialIcon.scss";
import { useState, useEffect } from "react";
import { fetchUserandColour } from "../../utils/axios";

export default function InitialIcon({ username, inTaskComponent }) {
  const [colour, setColour] = useState("");
  const [error, setError] = useState(null);

  // Get user and set user colour
  useEffect(() => {
    const fetchColour = async () => {
      const habitant = username;

      setError(null);

      try {
        const userColour = await fetchUserandColour(habitant);
        setColour(userColour);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchColour();
  }, [username]);

  // Get the initial of the username
  const userInitial = username ? username.charAt(0).toUpperCase() : "";

  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={inTaskComponent ? "initial-icon-small" : "initial-icon"}
      style={{ backgroundColor: colour || "lightpink" }}
    >
      <div className={userInitial === "C" ? "initial-icon-c" : ""}>
        {userInitial}
      </div>
    </div>
  );
}
