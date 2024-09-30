import { fetchHomeData, fetchTotalMinutes } from "../../utils/axios";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import "./NumberStats.scss";
import { useState, useEffect } from "react";

export default function NumberStats({ username, homeName, currentWeekISO }) {
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [totalMinutesUser1, setTotalMinutesUser1] = useState(0);

  // Fetch current home data (to get inhabitants)
  useEffect(() => {
    const getHomeData = async () => {
      const data = await fetchHomeData(homeName, setError);
      setHomeData(data);
    };
    getHomeData();
  }, [homeName]);

  // Get all done tasks of user from current WC and add up all minutes
  useEffect(() => {
    const getTotalMinutes = async () => {
      const data = await fetchTotalMinutes(username, currentWeekISO);
      console.log("data in frontend: ", data); // works
    };
    getTotalMinutes();
  }, [currentWeekISO]);

  if (error) return <p>Error: {error}</p>;

  // Show loading message while loading homeData
  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="number-stats-all">
      <div className="number-stats">
        {homeData.habitants.map((habitant, index) => (
          <div className="number-stats__icon-and-name">
            <div className="number-stats__pair">
              <div key={index} className="number-stats__icon">
                <InitialIconByHabitant habitant={habitant} />
              </div>
              <p className="number-stats__name">{habitant}</p>
            </div>
            <div className="number-stats__numbers">
              <div className="number-stats__number">Total time: 4h 45mins</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
