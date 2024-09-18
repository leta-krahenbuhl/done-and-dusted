import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WeeklyTasks({ homeName, currentWeekISO }) {
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [error, setError] = useState(null);

  // Get all tasks for this week and with repeat 'weekly'
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
      {weeklyTasks.length === 0 ? (
        <p className="weekly-tasks-all__text">No weekly tasks found</p>
      ) : (
        <div className="weekly-tasks">
          <div className="weekly-tasks__column-headers-div">
            <p className="weekly-tasks__column-headers">Task</p>
            <p className="weekly-tasks__column-headers">Duration</p>

            <p className="weekly-tasks__column-headers">Due</p>
          </div>
          <ul className="weekly-tasks__list">
            {weeklyTasks.map((task) => (
              <li key={task.id} className="weekly-tasks__list-item">
                <div className="weekly-tasks__list-item-part weekly-tasks__list-item-part--title">
                  {task.taskName}
                </div>
                <div className="weekly-tasks__list-item-part">
                  {task.minutes}mins
                </div>
                <div className="weekly-tasks__list-item-part">
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
