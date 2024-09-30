import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import "./NumberStats.scss";

export default function NumberStats({ homeData, totalMinutesByHabitant }) {
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
