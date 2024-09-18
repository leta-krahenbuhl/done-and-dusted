import "./Tasks.scss";
import { useState } from "react";
import { format } from "date-fns";

export default function Tasks() {
  const [tasks, setTasks] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMonday(new Date())
  );

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

  // if no tasks yet

  return (
    <div className="tasks-all">
      <div className="tasks-header">
        <button onClick={goToPreviousWeek} className="tasks-button">
          ←
        </button>
        <h2>{formattedWeekStart}</h2>
        <button onClick={goToNextWeek} className="tasks-button">
          →
        </button>
      </div>
      <div className="tasks-content">
        <p>Content for {formattedWeekStart}</p>
      </div>
    </div>
  );

  //     // To check if tasks object empty
  //     if (Object.keys(tasks).length === 0) {
  //   }
}
