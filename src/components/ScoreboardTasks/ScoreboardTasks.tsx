import { useEffect, useState } from "react";
import { fetchHomeData, fetchTasksDoneByUser } from "../../utils/axios";
import "./ScoreboardTasks.scss";
import InitialIcon from "../InitialIcon/InitialIcon";
import { Task } from "../../types/interfaces";

interface ScoreboardTasksProps {
  homeName: string;
  currentWeekISO: string;
}

export default function ScoreboardTasks({
  homeName,
  currentWeekISO,
}: ScoreboardTasksProps) {
  const [habitants, setHabitants] = useState<string[]>([]);
  const [taskArrays, setTaskArrays] = useState<Record<string, Task[]>>({});
  const [error, setError] = useState<string | null>(null);

  // Helper function to sort tasks by dueDate
  const sortTasksByDueDate = (tasks: Task[]) => {
    return tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  };

  // Get habitants of home
  useEffect(() => {
    const getHabitants = async () => {
      setError(null);
      try {
        const data = await fetchHomeData(homeName, setError);
        setHabitants(data.habitants);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    getHabitants();
  }, [homeName]);

  // Get all done tasks for each habitant
  useEffect(() => {
    if (habitants.length > 0) {
      const getTasksDoneByUser = async () => {
        try {
          // Create an object where keys are habitants and values are their task arrays
          const tasksByUser: Record<string, Task[]> = {};
          for (const habitant of habitants) {
            const data = await fetchTasksDoneByUser(
              habitant,
              currentWeekISO,
              setError
            );
            tasksByUser[habitant] = sortTasksByDueDate(data); // Sort the tasks by dueDate
          }
          setTaskArrays(tasksByUser); // Store the result in state as an object
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      };

      getTasksDoneByUser();
    }
  }, [habitants, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;
  if (habitants.length === 0 || Object.keys(taskArrays).length === 0)
    return <p>Loading... </p>;

  const inTaskComponent = true;

  return (
    <div className="scoreboard-tasks-all">
      <div className="scoreboard-tasks-all__title">
        All completed tasks by habitant
      </div>
      <div className="scoreboard-tasks-all__content">
        {habitants.map((habitant, index) => {
          const tasks = taskArrays[habitant] || []; // Get the tasks for this habitant, default to empty array

          return (
            <div className="scoreboard-tasks-user" key={index}>
              <div className="scoreboard-tasks-user__icon">
                <InitialIcon
                  username={habitant}
                  inTaskComponent={inTaskComponent}
                />
              </div>
              <div className="scoreboard-tasks-user-tasks">
                {tasks.length > 0 ? (
                  <ul className="scoreboard-tasks-user-tasks__list">
                    {tasks.map((task) => (
                      <li
                        key={task._id}
                        className="scoreboard-tasks-user-tasks__list-item"
                      >
                        <div className="scoreboard-tasks-user-tasks__list-item-part scoreboard-tasks-user-tasks__list-item-part--title">
                          {task.taskName}
                        </div>
                        <div className="scoreboard-tasks-user-tasks__list-item-part">
                          {task.minutes} mins
                        </div>
                        <div className="scoreboard-tasks-user-tasks__list-item-part">
                          {task.dueDate}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks completed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
