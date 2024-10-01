import "./Scoreboard.scss";
import { useState, useEffect } from "react";
import NumberStats from "../NumberStats/NumberStats";
import WeekSlider from "../WeekSlider/WeekSlider";
import { fetchHomeData, fetchTasksForMinutes } from "../../utils/axios";
import Stats from "../Stats/Stats";

export default function Scoreboard({ homeName }) {
  const [currentWeekISO, setCurrentWeekISO] = useState("");
  const [homeData, setHomeData] = useState(null);
  const [totalMinutesByHabitant, setTotalMinutesByHabitant] = useState({});
  const [error, setError] = useState(null);
  const [colour, setColour] = useState("");

  // set currentWeekISO
  const setCurrentWeek = (currentWeekISO) => {
    setCurrentWeekISO(currentWeekISO);
  };

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
    <div className="scoreboard-all">
      <div className="scoreboard-all__header">
        <WeekSlider setCurrentWeek={setCurrentWeek} />
      </div>

      <article className="scoreboard">
        <div className="scoreboard__content">
          <div className="scoreboard__habs-and-stats">
            <div className="scoreboard__habitants">
              <NumberStats
                homeData={homeData}
                totalMinutesByHabitant={totalMinutesByHabitant}
              />
            </div>
            <div className="scoreboard__stats">
              <Stats
                totalMinutesByHabitant={totalMinutesByHabitant}
                homeName={homeName}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
