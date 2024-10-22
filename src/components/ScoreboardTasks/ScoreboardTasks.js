import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchHomeData, fetchTasksDoneByUser } from "../../utils/axiosCalls";
import "./ScoreboardTasks.scss";
import InitialIcon from "../InitialIcon/InitialIcon";
export default function ScoreboardTasks({ homeName, currentWeekISO, }) {
    const [habitants, setHabitants] = useState([]);
    const [taskArrays, setTaskArrays] = useState({});
    const [error, setError] = useState(null);
    // Helper function to sort tasks by dueDate
    const sortTasksByDueDate = (tasks) => {
        return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    };
    // Get habitants of home
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
    // Get all done tasks for each habitant
    useEffect(() => {
        if (habitants.length > 0) {
            const getTasksDoneByUser = async () => {
                try {
                    // Create an object where keys are habitants and values are their task arrays
                    const tasksByUser = {};
                    for (const habitant of habitants) {
                        const data = await fetchTasksDoneByUser(habitant, currentWeekISO);
                        tasksByUser[habitant] = sortTasksByDueDate(data); // Sort the tasks by dueDate
                    }
                    setTaskArrays(tasksByUser); // Store the result in state as an object
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
            getTasksDoneByUser();
        }
    }, [habitants, currentWeekISO]);
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    if (habitants.length === 0 || Object.keys(taskArrays).length === 0)
        return _jsx("p", { children: "Loading... " });
    const inTaskComponent = true;
    return (_jsxs("div", { className: "scoreboard-tasks-all", children: [_jsx("div", { className: "scoreboard-tasks-all__title", children: "All completed tasks by habitant" }), _jsx("div", { className: "scoreboard-tasks-all__content", children: habitants.map((habitant, index) => {
                    const tasks = taskArrays[habitant] || []; // Get the tasks for this habitant, default to empty array
                    return (_jsxs("div", { className: "scoreboard-tasks-user", children: [_jsx("div", { className: "scoreboard-tasks-user__icon", children: _jsx(InitialIcon, { username: habitant, inTaskComponent: inTaskComponent }) }), _jsx("div", { className: "scoreboard-tasks-user-tasks", children: tasks.length > 0 ? (_jsx("ul", { className: "scoreboard-tasks-user-tasks__list", children: tasks.map((task) => (_jsxs("li", { className: "scoreboard-tasks-user-tasks__list-item", children: [_jsx("div", { className: "scoreboard-tasks-user-tasks__list-item-part scoreboard-tasks-user-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "scoreboard-tasks-user-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "scoreboard-tasks-user-tasks__list-item-part", children: task.dueDate })] }, task._id))) })) : (_jsx("p", { children: "No tasks completed" })) })] }, index));
                }) })] }));
}
