import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./Stats.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchHomeData, fetchUserandColour } from "../../utils/axiosCalls";
export default function Stats({ totalMinutesByHabitant, homeName, }) {
    const [error, setError] = useState(null);
    const [habitants, setHabitants] = useState(null);
    const [coloursByHabitants, setColoursByHabitants] = useState(null);
    const [loading, setLoading] = useState(true);
    // Get habitants
    useEffect(() => {
        const getHabitants = async () => {
            setError(null);
            try {
                const data = await fetchHomeData(homeName);
                setHabitants(data.habitants);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
        };
        getHabitants();
    }, [homeName]);
    // Get colours of habitants
    useEffect(() => {
        if (!habitants)
            return;
        const getColours = async () => {
            setError(null);
            let habitantColours = {};
            try {
                const coloursArray = await Promise.all(habitants.map(async (habitant) => {
                    const data = await fetchUserandColour(habitant);
                    return { [habitant]: data };
                }));
                habitantColours = Object.assign({}, ...coloursArray);
                setColoursByHabitants(habitantColours);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
            finally {
                setLoading(false);
            }
        };
        getColours();
    }, [habitants]);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    if (!habitants || !coloursByHabitants)
        return null;
    // Prepare data for PieChart
    const pieChartData = Object.entries(totalMinutesByHabitant).map(([habitant, minutes], index) => ({
        id: index,
        value: minutes,
        label: habitant,
        color: coloursByHabitants[habitant],
    }));
    const totalMinutes = Object.values(totalMinutesByHabitant).reduce((acc, minutes) => acc + minutes, 0);
    if (totalMinutes === 0) {
        return _jsx("p", { className: "stats-no-task-msg" });
    }
    return (_jsx("div", { className: "stats", children: _jsx(PieChart, { series: [
                {
                    data: pieChartData,
                },
            ], width: 400, height: 200 }) }));
}
