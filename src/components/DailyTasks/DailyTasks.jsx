import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import InitialIcon from "../InitialIcon/InitialIcon";

export default function DailyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
}) {
  const [dailyTasksUndone, setDailyTasksUndone] = useState([]);
  const [dailyTasksDone, setDailyTasksDone] = useState([]);
  const [error, setError] = useState(null);

  const dailyTaskComponent = true;

  // Get undone tasks
  useEffect(() => {
    axios
      .get("/api/tasks/daily-undone", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        setDailyTasksUndone(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  //Get done tasks
  useEffect(() => {
    axios
      .get("/api/tasks/daily-done", {
        params: { homeName, currentWeekISO },
      })
      .then((response) => {
        setDailyTasksDone(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      });
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="daily-tasks-all">
        {dailyTasksUndone.length === 0 ? (
          <p className="daily-tasks-all__text">No daily tasks</p>
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
            <div className="daily-tasks">
              <div className="daily-tasks__column-headers-div">
                <p className="daily-tasks__column-headers">Task</p>
                <p className="daily-tasks__column-headers">Duration</p>
                <p className="daily-tasks__column-headers">Due</p>
              </div>
              <ul className="daily-tasks__list">
                {dailyTasksDone.map((task) => (
                  <li
                    key={task.id}
                    className="daily-tasks__list-item daily-tasks__list-item--done"
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
                    <div className="daily-tasks__icon">
                      <InitialIcon
                        username={task.doneBy}
                        dailyTaskComponent={dailyTaskComponent}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
