import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyTasks({ homeName, currentWeekISO }) {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [error, setError] = useState(null);

  // Get all tasks for this week and with repeat 'daily'
  useEffect(() => {
    // Fetch tasks
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
      {dailyTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="daily-tasks">
          <div className="daily-tasks__column-headers-div">
            <p className="daily-tasks__column-headers">Task</p>
            <p className="daily-tasks__column-headers">Duration</p>

            <p className="daily-tasks__column-headers">Due</p>
          </div>
          <ul className="daily-tasks__list">
            {dailyTasks.map((task) => (
              <li key={task.id} className="daily-tasks__list-item">
                <div className="daily-tasks__list-item-part daily-tasks__list-item-part--title">
                  {task.taskName}
                </div>
                <div className="daily-tasks__list-item-part">
                  {task.minutes}
                </div>
                <div className="daily-tasks__list-item-part">
                  {task.dueDate}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

//     // To check if tasks object empty
//     if (Object.keys(tasks).length === 0) {
//   }

// If no tasks at all, render sth different?
