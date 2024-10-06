import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import {
  fetchWeeklyTasksDone,
  fetchWeeklyTasksUndone,
} from "../../utils/axios";
import InitialIcon from "../InitialIcon/InitialIcon";

export default function WeeklyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
}) {
  const [weeklyTasksUndone, setWeeklyTasksUndone] = useState([]);
  const [weeklyTasksDone, setWeeklyTasksDone] = useState([]);

  const [error, setError] = useState(null);

  // Sets class in InitialIcon to determine icon size
  // If in task component it's small, otherwise (ie in header or myHOme) big
  const inTaskComponent = true;

  // Get weekly undone tasks
  useEffect(() => {
    const getWeeklyTasksUndone = async () => {
      try {
        const data = await fetchWeeklyTasksUndone(homeName, currentWeekISO);

        setWeeklyTasksUndone(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getWeeklyTasksUndone();
  }, [homeName, currentWeekISO]);

  // Get weekly done tasks
  useEffect(() => {
    const getWeeklyTasksDone = async () => {
      try {
        const data = await fetchWeeklyTasksDone(homeName, currentWeekISO);

        setWeeklyTasksDone(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getWeeklyTasksDone();
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="weekly-tasks-all">
      {weeklyTasksUndone.length === 0 && weeklyTasksDone.length === 0 ? (
        <p className="weekly-tasks-all__text">No weekly tasks</p>
      ) : (
        <>
          <div className="weekly-tasks">
            <div className="weekly-tasks__column-headers-div">
              <p className="weekly-tasks__column-headers">Task</p>
              <p className="weekly-tasks__column-headers">Duration</p>
              <p className="weekly-tasks__column-headers">Due</p>
            </div>
            <ul className="weekly-tasks__list">
              {weeklyTasksUndone.map((task) => (
                <li
                  key={task._id}
                  className="weekly-tasks__list-item"
                  onClick={() => handleListItemClick(task)}
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
          <div className="weekly-tasks">
            <div className="weekly-tasks__column-headers-div">
              <p className="weekly-tasks__column-headers">Task</p>
              <p className="weekly-tasks__column-headers">Duration</p>
              <p className="weekly-tasks__column-headers">Due</p>
            </div>
            <ul className="weekly-tasks__list">
              {weeklyTasksDone.map((task) => (
                <li
                  key={task._id}
                  className="weekly-tasks__list-item weekly-tasks__list-item--done"
                  onClick={() => handleListItemClick(task)}
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
                  <div className="weekly-tasks__icon">
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
