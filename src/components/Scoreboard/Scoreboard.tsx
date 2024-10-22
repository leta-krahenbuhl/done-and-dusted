import "./Scoreboard.scss";
import { useState, useEffect } from "react";
import NumberStats from "../NumberStats/NumberStats";
import WeekSlider from "../WeekSlider/WeekSlider";
import { fetchHomeData, fetchTasksForMinutes } from "../../utils/axios";
import Stats from "../Stats/Stats";
import ScoreboardTasks from "../ScoreboardTasks/ScoreboardTasks";
import { Task, Home } from "../../types/interfaces";

interface ScoreboardProps {
  homeName: string;
}

export default function Scoreboard({ homeName }: ScoreboardProps) {
  const [currentWeekISO, setCurrentWeekISO] = useState<string>("");
  const [homeData, setHomeData] = useState<Home | null>(null);
  const [totalMinutesByHabitant, setTotalMinutesByHabitant] = useState({});
  const [error, setError] = useState<string | null>(null);
  //   const [colour, setColour] = useState("");

  // set currentWeekISO
  const setCurrentWeek = (currentWeekISO: string) => {
    setCurrentWeekISO(currentWeekISO);
  };

  // Fetch current home data (to get inhabitants)
  useEffect(() => {
    const getHomeData = async () => {
      try {
        const data = await fetchHomeData(homeName, setError);
        setHomeData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
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
              (acc: number, task: Task) => acc + (task.minutes || 0),
              0
            );
            return { habitant, totalMinutes };
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message);
            } else {
              alert("An unknown error occurred.");
            }
            return { habitant, totalMinutes: 0 }; // Return 0 on error
          }
        });

        const results = await Promise.all(tasksPromises);
        const totalMinutesObject = results.reduce(
          (acc: { [key: string]: number }, { habitant, totalMinutes }) => {
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
      <article className="scoreboard-tasklist">
        <ScoreboardTasks homeName={homeName} currentWeekISO={currentWeekISO} />
      </article>
    </div>
  );
}
