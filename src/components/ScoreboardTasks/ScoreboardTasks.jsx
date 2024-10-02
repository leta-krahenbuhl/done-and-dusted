import { useEffect, useState } from "react";
import { fetchHomeData, fetchTasksDoneByUser } from "../../utils/axios";
import "./ScoreboardTasks.scss";

export default function ScoreboardTasks({ homeName, currentWeekISO }) {
  const [habitants, setHabitants] = useState("");
  const [taskArrays, setTaskArrays] = useState("");
  const [error, setError] = useState(null);

  // Get habitants of home
  useEffect(() => {
    const getHabitants = async () => {
      setError(null);
      try {
        const data = await fetchHomeData(homeName, setError);
        setHabitants(data.habitants);
      } catch (error) {
        setError(error.message);
      }
    };
    getHabitants();
  }, [homeName]);

  // Get all done tasks of user
  useEffect(() => {
    if (habitants) {
      const getTasksDoneByUser = async () => {
        try {
          // map through habitants and get all done tasks for each habitant
          const tasksByUserPromises = habitants.map(async (habitant) => {
            const data = await fetchTasksDoneByUser(
              habitant,
              currentWeekISO,
              setError
            );
            return data; // returns the data, not a promise anymore
          });

          // Resolve all promises
          const resolvedTaskArrays = await Promise.all(tasksByUserPromises);
          setTaskArrays(resolvedTaskArrays);
        } catch (err) {
          setError(err.message);
        }
      };

      getTasksDoneByUser();
    }
  }, [habitants, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;
  if (!taskArrays) return <p>Loading... </p>;

  return (
    <div className="scoreboard-tasks-all">
      {taskArrays.map((allTasksOfAHabitant, index) => {
        return (
          <div className="scoreboard-tasks-user" key={index}>
            <div className="scoreboard-tasks-user__icon">
              {allTasksOfAHabitant[0].doneBy}
            </div>
            <div className="scoreboard-tasks-user__tasks">
              {allTasksOfAHabitant.map((task) => {
                return (
                  <div className="test-container" key={task._id}>
                    {task.taskName}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
