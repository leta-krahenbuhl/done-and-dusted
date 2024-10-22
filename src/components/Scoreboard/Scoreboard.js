import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import "./Scoreboard.scss";
import { useState, useEffect } from "react";
import NumberStats from "../NumberStats/NumberStats";
import WeekSlider from "../WeekSlider/WeekSlider";
import { fetchHomeData, fetchTasksForMinutes } from "../../utils/axiosCalls";
import Stats from "../Stats/Stats";
import ScoreboardTasks from "../ScoreboardTasks/ScoreboardTasks";
export default function Scoreboard({ homeName }) {
    const [currentWeekISO, setCurrentWeekISO] = useState("");
    const [homeData, setHomeData] = useState(null);
    const [totalMinutesByHabitant, setTotalMinutesByHabitant] = useState({});
    const [error, setError] = useState(null);
    //   const [colour, setColour] = useState("");
    // set currentWeekISO
    const setCurrentWeek = (currentWeekISO) => {
        setCurrentWeekISO(currentWeekISO);
    };
    // Fetch current home data (to get inhabitants)
    useEffect(() => {
        const getHomeData = async () => {
            try {
                const data = await fetchHomeData(homeName);
                setHomeData(data);
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
        getHomeData();
    }, [homeName]);
    // Get minutes per habitant
    useEffect(() => {
        if (homeData) {
            const fetchTasksForHabitants = async () => {
                const tasksPromises = homeData.habitants.map(async (habitant) => {
                    try {
                        const data = await fetchTasksForMinutes(habitant, currentWeekISO);
                        const totalMinutes = data.reduce((acc, task) => acc + (task.minutes || 0), 0);
                        return { habitant, totalMinutes };
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            alert(error.message);
                        }
                        else {
                            alert("An unknown error occurred.");
                        }
                        return { habitant, totalMinutes: 0 }; // Return 0 on error
                    }
                });
                const results = await Promise.all(tasksPromises);
                const totalMinutesObject = results.reduce((acc, { habitant, totalMinutes }) => {
                    acc[habitant] = totalMinutes;
                    return acc;
                }, {});
                setTotalMinutesByHabitant(totalMinutesObject);
            };
            fetchTasksForHabitants();
        }
    }, [homeData, currentWeekISO]);
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    if (!homeData) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "scoreboard-all", children: [_jsx("div", { className: "scoreboard-all__header", children: _jsx(WeekSlider, { setCurrentWeek: setCurrentWeek }) }), _jsx("article", { className: "scoreboard", children: _jsx("div", { className: "scoreboard__content", children: _jsxs("div", { className: "scoreboard__habs-and-stats", children: [_jsx("div", { className: "scoreboard__habitants", children: _jsx(NumberStats, { homeData: homeData, totalMinutesByHabitant: totalMinutesByHabitant }) }), _jsx("div", { className: "scoreboard__stats", children: _jsx(Stats, { totalMinutesByHabitant: totalMinutesByHabitant, homeName: homeName }) })] }) }) }), _jsx("article", { className: "scoreboard-tasklist", children: _jsx(ScoreboardTasks, { homeName: homeName, currentWeekISO: currentWeekISO }) })] }));
}
