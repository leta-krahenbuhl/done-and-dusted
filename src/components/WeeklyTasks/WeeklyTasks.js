import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./WeeklyTasks.scss";
import { useState, useEffect } from "react";
import { fetchWeeklyTasksDone, fetchWeeklyTasksUndone, } from "../../utils/axiosCalls";
import InitialIcon from "../InitialIcon/InitialIcon";
export default function WeeklyTasks({ homeName, currentWeekISO, handleListItemClick, taskRefreshTrigger, }) {
    const [weeklyTasksUndone, setWeeklyTasksUndone] = useState([]);
    const [weeklyTasksDone, setWeeklyTasksDone] = useState([]);
    const [error, setError] = useState(null);
    // Sets class in InitialIcon to determine icon size
    const inTaskComponent = true;
    // Helper function to sort tasks by dueDate
    const sortTasksByDueDate = (tasks) => {
        return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    };
    // Get weekly undone tasks
    useEffect(() => {
        const getWeeklyTasksUndone = async () => {
            try {
                const data = await fetchWeeklyTasksUndone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setWeeklyTasksUndone(sortedTasks);
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
        getWeeklyTasksUndone();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    // Get weekly done tasks
    useEffect(() => {
        const getWeeklyTasksDone = async () => {
            try {
                const data = await fetchWeeklyTasksDone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setWeeklyTasksDone(sortedTasks);
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
        getWeeklyTasksDone();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsx("div", { className: "weekly-tasks-all", children: weeklyTasksUndone.length === 0 && weeklyTasksDone.length === 0 ? (_jsx("p", { className: "weekly-tasks-all__text", children: "No weekly tasks" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "weekly-tasks", children: [_jsxs("div", { className: "weekly-tasks__column-headers-div", children: [_jsx("p", { className: "weekly-tasks__column-headers weekly-tasks__column-headers--taskname", children: "Task" }), _jsx("p", { className: "weekly-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "weekly-tasks__column-headers", children: "Due" })] }), _jsx("ul", { className: "weekly-tasks__list", children: weeklyTasksUndone.map((task) => (_jsxs("li", { className: "weekly-tasks__list-item", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "weekly-tasks__list-item-part weekly-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "weekly-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "weekly-tasks__list-item-part", children: task.dueDate })] }, task._id))) })] }), _jsxs("div", { className: "weekly-tasks", children: [_jsxs("div", { className: "weekly-tasks__column-headers-div", children: [_jsx("p", { className: "weekly-tasks__column-headers weekly-tasks__column-headers--taskname-done", children: "Task" }), _jsx("p", { className: "weekly-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "weekly-tasks__column-headers weekly-tasks__column-headers--due-done", children: "Due" })] }), _jsx("ul", { className: "weekly-tasks__list", children: weeklyTasksDone.map((task) => (_jsxs("li", { className: "weekly-tasks__list-item weekly-tasks__list-item--done", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "weekly-tasks__list-item-part weekly-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "weekly-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "weekly-tasks__list-item-part", children: task.dueDate }), _jsx("div", { className: "weekly-tasks__icon", children: _jsx(InitialIcon, { username: task.doneBy, inTaskComponent: inTaskComponent }) })] }, task._id))) })] })] })) }));
}
