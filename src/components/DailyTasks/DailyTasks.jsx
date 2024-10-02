import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import InitialIcon from "../InitialIcon/InitialIcon";
import { fetchDailyTasksUndone } from "../../utils/axios";
import { fetchDailyTasksDone } from "../../utils/axios";

export default function DailyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
}) {
  const [dailyTasksUndone, setDailyTasksUndone] = useState([]);
  const [dailyTasksDone, setDailyTasksDone] = useState([]);
  const [error, setError] = useState(null);

  // Sets class in InitialIcon to determine size
  // If in task component it's small, otherwise (ie in header or myHOme) big
  const inTaskComponent = true;

  // Get daily undone tasks
  useEffect(() => {
    fetchDailyTasksUndone(
      homeName,
      currentWeekISO,
      setDailyTasksUndone,
      setError
    );
  }, [homeName, currentWeekISO]);

  //Get daily done tasks
  useEffect(() => {
    fetchDailyTasksDone(homeName, currentWeekISO, setDailyTasksDone, setError);
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="daily-tasks-all">
      {dailyTasksUndone.length === 0 && dailyTasksDone.length === 0 ? (
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
                  key={task._id}
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
                  key={task._id}
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
                      inTaskComponent={inTaskComponent}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
