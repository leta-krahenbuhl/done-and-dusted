import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyTasks({ homeName, currentWeekISO }) {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [error, setError] = useState(null);

  // Get all tasks for this week and with repeat 'daily'
  useEffect(() => {
    // Fetch tasks
    console.log("currentWeekISO from DailyTasks.jsx", currentWeekISO);
    axios
      .get("/api/tasks/daily", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        setDailyTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="daily-tasks-all">
      <p>Daily tasks:</p>
      {dailyTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {dailyTasks.map((task) => (
            <li key={task.id}>{task.taskName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

//     // To check if tasks object empty
//     if (Object.keys(tasks).length === 0) {
//   }

// If no tasks at all, render sth different?
