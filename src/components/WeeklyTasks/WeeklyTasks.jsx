import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import { fetchWeeklyTasks } from "../../utils/axios";

export default function WeeklyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
}) {
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch tasks for this week
  useEffect(() => {
    fetchWeeklyTasks(homeName, currentWeekISO, setError, setWeeklyTasks);
  }, [homeName, currentWeekISO]);

  // If there's an error, display it
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
              <li
                key={task.id}
                className="weekly-tasks__list-item"
                onClick={() => handleListItemClick(task)} // Use the passed handler for clicks
              >
                <div className="weekly-tasks__list-item-part weekly-tasks__list-item-part--title">
                  {task.taskName}
                </div>
                <div className="weekly-tasks__list-item-part">
                  {task.minutes} mins
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
