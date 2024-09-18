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
        <p className="other-tasks-all__text">No other tasks found</p>
      ) : (
        <div className="other-tasks">
          <div className="other-tasks__column-headers-div">
            <p className="other-tasks__column-headers">Task</p>
            <p className="other-tasks__column-headers">Duration</p>

            <p className="other-tasks__column-headers">Due</p>
          </div>
          <ul className="other-tasks__list">
            {otherTasks.map((task) => (
              <li key={task.id} className="other-tasks__list-item">
                <div className="other-tasks__list-item-part other-tasks__list-item-part--title">
                  {task.taskName}
                </div>
                <div className="other-tasks__list-item-part">
                  {task.minutes}mins
                </div>
                <div className="other-tasks__list-item-part">
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
