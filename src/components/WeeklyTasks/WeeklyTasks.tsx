import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import {
  fetchWeeklyTasksDone,
  fetchWeeklyTasksUndone,
} from "../../utils/axiosCalls";
import InitialIcon from "../InitialIcon/InitialIcon";
import { Task } from "../../types/interfaces";

interface WeeklyTasksProps {
  homeName: string;
  currentWeekISO: string;
  handleListItemClick: (task: Task) => void;
  taskRefreshTrigger: boolean;
}

export default function WeeklyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
  taskRefreshTrigger,
}: WeeklyTasksProps) {
  const [weeklyTasksUndone, setWeeklyTasksUndone] = useState<Task[]>([]);
  const [weeklyTasksDone, setWeeklyTasksDone] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sets class in InitialIcon to determine icon size
  const inTaskComponent = true;

  // Helper function to sort tasks by dueDate
  const sortTasksByDueDate = (tasks: Task[]) => {
    return tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  };

  // Get weekly undone tasks
  useEffect(() => {
    const getWeeklyTasksUndone = async () => {
      try {
        const data = await fetchWeeklyTasksUndone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setWeeklyTasksUndone(sortedTasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    getWeeklyTasksUndone();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  // Get weekly done tasks
  useEffect(() => {
    const getWeeklyTasksDone = async () => {
      try {
        const data = await fetchWeeklyTasksDone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setWeeklyTasksDone(sortedTasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    getWeeklyTasksDone();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="weekly-tasks-all">
      {weeklyTasksUndone.length === 0 && weeklyTasksDone.length === 0 ? (
        <p className="weekly-tasks-all__text">No weekly tasks</p>
      ) : (
        <>
          <div className="weekly-tasks">
            <div className="weekly-tasks__column-headers-div">
              <p className="weekly-tasks__column-headers weekly-tasks__column-headers--taskname">
                Task
              </p>
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
              <p className="weekly-tasks__column-headers weekly-tasks__column-headers--taskname-done">
                Task
              </p>
              <p className="weekly-tasks__column-headers">Duration</p>
              <p className="weekly-tasks__column-headers weekly-tasks__column-headers--due-done">
                Due
              </p>
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
