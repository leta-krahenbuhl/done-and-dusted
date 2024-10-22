import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import "./NumberStats.scss";

interface Home {
  _id: string;
  homeName: string;
  habitants: string[];
  admins: string[];
}

interface NumberStatsProps {
  homeData: Home;
  totalMinutesByHabitant: {
    [habitant: string]: number; // The key is a string (habitant), and the value is a number
  };
}

export default function NumberStats({
  homeData,
  totalMinutesByHabitant,
}: NumberStatsProps) {
  console.log("totalMinutesByHabitant: ", totalMinutesByHabitant);

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
