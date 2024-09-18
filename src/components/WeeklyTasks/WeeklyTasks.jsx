import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WeeklyTasks({ homeName, currentWeekISO }) {
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [error, setError] = useState(null);

  // Get all tasks for this week and with repeat 'daily'
  useEffect(() => {
    // Fetch tasks
    axios
      .get("/api/tasks/weekly", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        setWeeklyTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="weekly-tasks-all">
      <p>Weekly tasks:</p>
      {weeklyTasks.length === 0 ? (
        <p>No weekly tasks found</p>
      ) : (
        <ul>
          {weeklyTasks.map((task) => (
            <li key={task.id}>
              {task.taskName} | {task.minutes}mins | {task.dueDate}
            </li>
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
