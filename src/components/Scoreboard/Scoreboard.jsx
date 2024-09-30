import "./Scoreboard.scss";
import { useState } from "react";
import NumberStats from "../NumberStats/NumberStats";
import WeekSlider from "../WeekSlider/WeekSlider";

export default function Scoreboard({ homeName }) {
  const [currentWeekISO, setCurrentWeekISO] = useState("");

  // set currentWeekISO
  const setCurrentWeek = (currentWeekISO) => {
    setCurrentWeekISO(currentWeekISO);
  };

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
                homeName={homeName}
                currentWeekISO={currentWeekISO}
              />
            </div>
            <div className="scoreboard__stats">stats</div>
          </div>
        </div>
      </article>
    </div>
  );
}
