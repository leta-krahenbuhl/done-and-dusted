import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import InitialIcon from "../InitialIcon/InitialIcon";
import { fetchDailyTasksUndone, fetchDailyTasksDone } from "../../utils/axios";
import { Task } from "../../types/interfaces";

interface AddTasksProps {
  homeName: string;
  currentWeekISO: string;
  handleListItemClick: (task: Task) => void;
  taskRefreshTrigger: () => void;
}

export default function DailyTasks({
  homeName,
  currentWeekISO,
  handleListItemClick,
  taskRefreshTrigger,
}: AddTasksProps) {
  const [dailyTasksUndone, setDailyTasksUndone] = useState<Task[]>([]);
  const [dailyTasksDone, setDailyTasksDone] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sets class in InitialIcon to determine size
  const inTaskComponent: boolean = true;

  // Helper function to sort tasks by dueDate
  const sortTasksByDueDate = (tasks: Task[]) => {
    return tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  };

  // Get daily undone tasks
  useEffect(() => {
    const getDailyTasksUndone = async () => {
      try {
        const data = await fetchDailyTasksUndone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setDailyTasksUndone(sortedTasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    getDailyTasksUndone();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  // Get daily done tasks
  useEffect(() => {
    const getDailyTasksDone = async () => {
      try {
        const data = await fetchDailyTasksDone(homeName, currentWeekISO);
        const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
        setDailyTasksDone(sortedTasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    getDailyTasksDone();
  }, [homeName, currentWeekISO, taskRefreshTrigger]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="daily-tasks-all">
      {dailyTasksUndone.length === 0 && dailyTasksDone.length === 0 ? (
        <p className="daily-tasks-all__text">No daily tasks</p>
      ) : (
        <>
          <div className="daily-tasks">
            <div className="daily-tasks__column-headers-div">
              <p className="daily-tasks__column-headers daily-tasks__column-headers--taskname">
                Task
              </p>
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
              <p className="daily-tasks__column-headers daily-tasks__column-headers--taskname-done">
                Task
              </p>
              <p className="daily-tasks__column-headers">Duration</p>
              <p className="daily-tasks__column-headers daily-tasks__column-headers--due-done">
                Due
              </p>
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
