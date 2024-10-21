import "./WeekSlider.scss";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function WeekSlider({ setCurrentWeek }) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMonday(new Date())
  );

  // Current week for further use as ISO string
  useEffect(() => {
    const currentWeekISO = currentWeekStart.toISOString().substring(0, 10);
    setCurrentWeek(currentWeekISO);
  }, [currentWeekStart]);

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

  return (
    <div className="week-slider">
      <button onClick={goToPreviousWeek} className="tasks-button">
        ←
      </button>
      <h2>{formattedWeekStart}</h2>
      <button onClick={goToNextWeek} className="tasks-button">
        →
      </button>
    </div>
  );
}
