import "./OtherTasks.scss";
import { useState, useEffect } from "react";
import { fetchOtherTasksDone, fetchOtherTasksUndone } from "../../utils/axios";
import InitialIcon from "../InitialIcon/InitialIcon";

export default function OtherTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
  taskRefreshTrigger,
}) {
  const [otherTasksDone, setOtherTasksDone] = useState([]);
  const [otherTasksUndone, setOtherTasksUndone] = useState([]);
  const [error, setError] = useState(null);

  // Sets class in InitialIcon to determine size
  const inTaskComponent = true;

  // Helper function to sort tasks by dueDate
  const sortTasksByDueDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  // Get tasks other: undone
  useEffect(() => {
    const getOtherTasks = async () => {
      try {
        const data = await fetchOtherTasksUndone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setOtherTasksUndone(sortedTasks);
      } catch (err) {
        setError(err.message); // Handle the error locally in the component
      }
    };
    getOtherTasks();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  // Get tasks other: done
  useEffect(() => {
    const getOtherTasksDone = async () => {
      try {
        const data = await fetchOtherTasksDone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setOtherTasksDone(sortedTasks);
      } catch (err) {
        setError(err.message);
      }
    };
    getOtherTasksDone();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="other-tasks-all">
      {otherTasksUndone.length === 0 && otherTasksDone.length === 0 ? (
        <p className="other-tasks-all__text">No other tasks</p>
      ) : (
        <>
          <div className="other-tasks">
            <div className="other-tasks__column-headers-div">
              <p className="other-tasks__column-headers other-tasks__column-headers--taskname">
                Task
              </p>
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
                    {task.minutes} mins
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
              <p className="other-tasks__column-headers other-tasks__column-headers--taskname-done">
                Task
              </p>
              <p className="other-tasks__column-headers">Duration</p>
              <p className="other-tasks__column-headers other-tasks__column-headers--due-done">
                Due
              </p>
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
