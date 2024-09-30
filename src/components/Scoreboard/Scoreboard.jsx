import "./Scoreboard.scss";
import { useState } from "react";
import { format } from "date-fns";
import NumberStats from "../NumberStats/NumberStats";

export default function Scoreboard({ homeName }) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMonday(new Date())
  );
  const [error, setError] = useState(null);

  // Current week for further use as ISO string
  const currentWeekISO = currentWeekStart.toISOString().substring(0, 10);

  // Function to get the Monday of the given date's week
  function getMonday(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday (0)
    return new Date(date.setDate(diff));
  }

  // Format the week start date as "WC 16th Sep 2024"
  const formattedWeekStart = format(currentWeekStart, "'WC' do MMM yyyy");

  // Handle previous week click
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => {
      const previousWeek = new Date(prev);
      previousWeek.setDate(previousWeek.getDate() - 7);
      return previousWeek;
    });
  };

  // Handle next week click
  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const nextWeek = new Date(prev);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    });
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="scoreboard-all">
      <div className="scoreboard-all__header">
        <button onClick={goToPreviousWeek} className="tasks-button">
          ←
        </button>
        <h2>{formattedWeekStart}</h2>
        <button onClick={goToNextWeek} className="tasks-button">
          →
        </button>
      </div>

      <article className="scoreboard">
        <div className="scoreboard__content">
          <div className="scoreboard__habs-and-stats">
            <div className="scoreboard__habitants">
              <NumberStats
                homeName={homeName}
                currentWeekISO={currentWeekISO}
              />
            </div>
            <div className="scoreboard__stats">stats</div>
          </div>
        </div>
      </article>
    </div>
  );
}
