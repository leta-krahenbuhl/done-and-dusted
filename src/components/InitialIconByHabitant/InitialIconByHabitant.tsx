import "./InitialIconByHabitant.scss";
import { useState, useEffect } from "react";
import { fetchUserandColour } from "../../utils/axiosCalls";

interface InitialIconByHabitantProps {
  habitant: string;
}

export default function InitialIconByHabitant({
  habitant,
}: InitialIconByHabitantProps) {
  const [colour, setColour] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Get user and set user colour
  useEffect(() => {
    const fetchColour = async () => {
      setError(null);

      try {
        const userColour = await fetchUserandColour(habitant);
        setColour(userColour);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchColour();
  }, [habitant]);

  // Get the initial of the username
  const userInitial = habitant ? habitant.charAt(0).toUpperCase() : "";

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className="initial-icon"
        style={{ backgroundColor: colour || "lightpink" }}
      >
        <div className={userInitial === "C" ? "initial-icon-c" : ""}>
          {userInitial}
        </div>
      </div>
    </>
  );
}
