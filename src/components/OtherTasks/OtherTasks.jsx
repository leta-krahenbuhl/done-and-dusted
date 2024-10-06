import "./OtherTasks.scss";
import { useState, useEffect } from "react";
import { fetchOtherTasksDone, fetchOtherTasksUndone } from "../../utils/axios";
import InitialIcon from "../InitialIcon/InitialIcon";

export default function OtherTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
}) {
  const [otherTasksDone, setOtherTasksDone] = useState([]);
  const [otherTasksUndone, setOtherTasksUndone] = useState([]);
  const [error, setError] = useState(null);

  // Sets class in InitialIcon to determine size
  // If in task component it's small, otherwise (ie in header or myHOme) big
  const inTaskComponent = true;

  // Get tasks other: undone
  useEffect(() => {
    const getOtherTasks = async () => {
      try {
        const data = await fetchOtherTasksUndone(homeName, currentWeekISO);

        setOtherTasksUndone(data);
      } catch (err) {
        setError(err.message); // Handle the error locally in the component
      }
    };
    getOtherTasks();
  }, [homeName, currentWeekISO]);

  // Get tasks other: done
  useEffect(() => {
    const getOtherTasksDone = async () => {
      try {
        const data = await fetchOtherTasksDone(homeName, currentWeekISO);

        setOtherTasksDone(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getOtherTasksDone();
  }, [homeName, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="other-tasks-all">
      {otherTasksUndone.length === 0 && otherTasksDone.length === 0 ? (
        <p className="other-tasks-all__text">No other tasks</p>
      ) : (
        <>
          <div className="other-tasks">
            <div className="other-tasks__column-headers-div">
              <p className="other-tasks__column-headers">Task</p>
              <p className="other-tasks__column-headers">Duration</p>
              <p className="other-tasks__column-headers">Due</p>
            </div>
            <ul className="other-tasks__list">
              {otherTasksUndone.map((task) => (
                <li
                  key={task._id}
                  className="other-tasks__list-item"
                  onClick={() => handleListItemClick(task)}
                >
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
          <div className="other-tasks">
            <div className="other-tasks__column-headers-div">
              <p className="other-tasks__column-headers">Task</p>
              <p className="other-tasks__column-headers">Duration</p>
              <p className="other-tasks__column-headers">Due</p>
            </div>
            <ul className="other-tasks__list">
              {otherTasksDone.map((task) => (
                <li
                  key={task._id}
                  className="other-tasks__list-item other-tasks__list-item--done"
                  onClick={() => handleListItemClick(task)}
                >
                  <div className="other-tasks__list-item-part other-tasks__list-item-part--title">
                    {task.taskName}
                  </div>
                  <div className="other-tasks__list-item-part">
                    {task.minutes} mins
                  </div>
                  <div className="other-tasks__list-item-part">
                    {task.dueDate}
                  </div>
                  <div className="other-tasks__icon">
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
