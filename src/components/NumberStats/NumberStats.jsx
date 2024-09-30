import { fetchHomeData, fetchTasksForMinutes } from "../../utils/axios";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import "./NumberStats.scss";
import { useState, useEffect } from "react";

export default function NumberStats({ homeName, currentWeekISO }) {
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [totalMinutesByHabitant, setTotalMinutesByHabitant] = useState({});

  // Fetch current home data (to get inhabitants)
  useEffect(() => {
    const getHomeData = async () => {
      try {
        const data = await fetchHomeData(homeName, setError);
        setHomeData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getHomeData();
  }, [homeName]);

  // Get minutes per habitant
  useEffect(() => {
    if (homeData) {
      const fetchTasksForHabitants = async () => {
        const tasksPromises = homeData.habitants.map(async (habitant) => {
          try {
            const data = await fetchTasksForMinutes(habitant, currentWeekISO);
            const totalMinutes = data.reduce(
              (acc, task) => acc + (task.minutes || 0),
              0
            );
            return { habitant, totalMinutes };
          } catch (err) {
            setError(err.message);
            return { habitant, totalMinutes: 0 }; // Return 0 on error
          }
        });

        const results = await Promise.all(tasksPromises);
        const totalMinutesObject = results.reduce(
          (acc, { habitant, totalMinutes }) => {
            acc[habitant] = totalMinutes;
            return acc;
          },
          {}
        );

        setTotalMinutesByHabitant(totalMinutesObject);
      };

      fetchTasksForHabitants();
    }
  }, [homeData, currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="number-stats-all">
      <div className="number-stats">
        {homeData.habitants.map((habitant, index) => (
          <div key={index} className="number-stats__icon-and-name">
            <div className="number-stats__pair">
              <div className="number-stats__icon">
                <InitialIconByHabitant habitant={habitant} />
              </div>
              <p className="number-stats__name">{habitant}</p>
            </div>
            <div className="number-stats__numbers">
              <div className="number-stats__number">
                Total time: {Math.floor(totalMinutesByHabitant[habitant] / 60)}h{" "}
                {totalMinutesByHabitant[habitant] % 60}mins
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
