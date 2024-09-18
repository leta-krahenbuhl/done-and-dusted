import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskDetail from "../TaskDetail/TaskDetail";

export default function DailyTasks({ homeName, currentWeekISO }) {
  const [dailyTasksUndone, setDailyTasksUndone] = useState([]);
  const [error, setError] = useState(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks
  useEffect(() => {
    axios
      .get("/api/tasks/daily-undone", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Debugging line
        setDailyTasksUndone(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  const handleListItemClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const closeOverlay = () => {
    setIsTaskDetailOpen(false);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="daily-tasks-all">
      {dailyTasksUndone.length === 0 ? (
        <p className="daily-tasks-all__text">No daily tasks found</p>
      ) : (
        <>
          <div className="daily-tasks">
            <div className="daily-tasks__column-headers-div">
              <p className="daily-tasks__column-headers">Task</p>
              <p className="daily-tasks__column-headers">Duration</p>
              <p className="daily-tasks__column-headers">Due</p>
            </div>
            <ul className="daily-tasks__list">
              {dailyTasksUndone.map((task) => (
                <li
                  key={task.id}
                  className="daily-tasks__list-item"
                  onClick={() => handleListItemClick(task)}
                >
                  <div className="daily-tasks__list-item-part daily-tasks__list-item-part--title">
                    {task.taskName}
                  </div>
                  <div className="daily-tasks__list-item-part">
                    {task.minutes} mins
                  </div>
                  <div className="daily-tasks__list-item-part">
                    {task.dueDate}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="daily-tasks-done">
            {/* Placeholder for tasks done if needed */}
          </div>
          {isTaskDetailOpen && (
            <TaskDetail
              selectedTask={selectedTask}
              closeOverlay={closeOverlay}
            />
          )}
        </>
      )}
    </div>
  );
}
