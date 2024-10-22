import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./DailyTasks.scss";
import { useState, useEffect } from "react";
import InitialIcon from "../InitialIcon/InitialIcon";
import { fetchDailyTasksUndone, fetchDailyTasksDone, } from "../../utils/axiosCalls";
export default function DailyTasks({ homeName, currentWeekISO, handleListItemClick, taskRefreshTrigger, }) {
    const [dailyTasksUndone, setDailyTasksUndone] = useState([]);
    const [dailyTasksDone, setDailyTasksDone] = useState([]);
    const [error, setError] = useState(null);
    // Sets class in InitialIcon to determine size
    const inTaskComponent = true;
    // Helper function to sort tasks by dueDate
    const sortTasksByDueDate = (tasks) => {
        return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    };
    // Get daily undone tasks
    useEffect(() => {
        const getDailyTasksUndone = async () => {
            try {
                const data = await fetchDailyTasksUndone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setDailyTasksUndone(sortedTasks);
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
        getDailyTasksUndone();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    // Get daily done tasks
    useEffect(() => {
        const getDailyTasksDone = async () => {
            try {
                const data = await fetchDailyTasksDone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setDailyTasksDone(sortedTasks);
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
        getDailyTasksDone();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsx("div", { className: "daily-tasks-all", children: dailyTasksUndone.length === 0 && dailyTasksDone.length === 0 ? (_jsx("p", { className: "daily-tasks-all__text", children: "No daily tasks" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "daily-tasks", children: [_jsxs("div", { className: "daily-tasks__column-headers-div", children: [_jsx("p", { className: "daily-tasks__column-headers daily-tasks__column-headers--taskname", children: "Task" }), _jsx("p", { className: "daily-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "daily-tasks__column-headers", children: "Due" })] }), _jsx("ul", { className: "daily-tasks__list", children: dailyTasksUndone.map((task) => (_jsxs("li", { className: "daily-tasks__list-item", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "daily-tasks__list-item-part daily-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "daily-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "daily-tasks__list-item-part", children: task.dueDate })] }, task._id))) })] }), _jsxs("div", { className: "daily-tasks", children: [_jsxs("div", { className: "daily-tasks__column-headers-div", children: [_jsx("p", { className: "daily-tasks__column-headers daily-tasks__column-headers--taskname-done", children: "Task" }), _jsx("p", { className: "daily-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "daily-tasks__column-headers daily-tasks__column-headers--due-done", children: "Due" })] }), _jsx("ul", { className: "daily-tasks__list", children: dailyTasksDone.map((task) => (_jsxs("li", { className: "daily-tasks__list-item daily-tasks__list-item--done", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "daily-tasks__list-item-part daily-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "daily-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "daily-tasks__list-item-part", children: task.dueDate }), _jsx("div", { className: "daily-tasks__icon", children: _jsx(InitialIcon, { username: task.doneBy, inTaskComponent: inTaskComponent }) })] }, task._id))) })] })] })) }));
}
