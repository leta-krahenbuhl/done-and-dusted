import { useState, useEffect } from "react";
import "./Stats.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchHomeData, fetchUserandColour } from "../../utils/axios";

export default function Stats({ totalMinutesByHabitant, homeName }) {
  const [error, setError] = useState(null);
  const [habitants, setHabitants] = useState(null);
  const [coloursByHabitants, setColoursByHabitants] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get habitants
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

  // Get colours of habitants
  useEffect(() => {
    if (!habitants) return;

    const getColours = async () => {
      setError(null);
      let habitantColours = {};

      try {
        const coloursArray = await Promise.all(
          habitants.map(async (habitant) => {
            const data = await fetchUserandColour(habitant);
            return { [habitant]: data };
          })
        );

        habitantColours = Object.assign({}, ...coloursArray);
        setColoursByHabitants(habitantColours);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getColours();
  }, [habitants]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!habitants || !coloursByHabitants) return null;

  // Prepare data for PieChart
  const pieChartData = Object.entries(totalMinutesByHabitant).map(
    ([habitant, minutes], index) => ({
      id: index,
      value: minutes,
      label: habitant,
      color: coloursByHabitants[habitant],
    })
  );

  return (
    <div className="stats">
      <PieChart series={[{ data: pieChartData }]} width={400} height={200} />
    </div>
  );
}