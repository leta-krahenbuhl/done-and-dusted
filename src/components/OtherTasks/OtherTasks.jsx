import "./OtherTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OtherTasks({ homeName, currentWeekISO }) {
  const [otherTasks, setOtherTasks] = useState([]);
  const [error, setError] = useState(null);

  // Get all tasks for this week and with repeat 'other'
  useEffect(() => {
    // Fetch tasks
    axios
      .get("/api/tasks/other", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        setOtherTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="other-tasks-all">
      {otherTasks.length === 0 ? (
        <p>No other tasks found</p>
      ) : (
        <ul>
          {otherTasks.map((task) => (
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
