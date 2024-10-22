import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./OtherTasks.scss";
import { useState, useEffect } from "react";
import { fetchOtherTasksDone, fetchOtherTasksUndone, } from "../../utils/axiosCalls";
import InitialIcon from "../InitialIcon/InitialIcon";
export default function OtherTasks({ homeName, currentWeekISO, handleListItemClick, taskRefreshTrigger, }) {
    const [otherTasksDone, setOtherTasksDone] = useState([]);
    const [otherTasksUndone, setOtherTasksUndone] = useState([]);
    const [error, setError] = useState(null);
    // Sets class in InitialIcon to determine size
    const inTaskComponent = true;
    // Helper function to sort tasks by dueDate
    const sortTasksByDueDate = (tasks) => {
        return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    };
    // Get tasks other: undone
    useEffect(() => {
        const getOtherTasks = async () => {
            try {
                const data = await fetchOtherTasksUndone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setOtherTasksUndone(sortedTasks);
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
        getOtherTasks();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    // Get tasks other: done
    useEffect(() => {
        const getOtherTasksDone = async () => {
            try {
                const data = await fetchOtherTasksDone(homeName, currentWeekISO);
                const sortedTasks = sortTasksByDueDate(data); // Sort the tasks by dueDate
                setOtherTasksDone(sortedTasks);
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
        getOtherTasksDone();
    }, [homeName, currentWeekISO, taskRefreshTrigger]);
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsx("div", { className: "other-tasks-all", children: otherTasksUndone.length === 0 && otherTasksDone.length === 0 ? (_jsx("p", { className: "other-tasks-all__text", children: "No other tasks" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "other-tasks", children: [_jsxs("div", { className: "other-tasks__column-headers-div", children: [_jsx("p", { className: "other-tasks__column-headers other-tasks__column-headers--taskname", children: "Task" }), _jsx("p", { className: "other-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "other-tasks__column-headers", children: "Due" })] }), _jsx("ul", { className: "other-tasks__list", children: otherTasksUndone.map((task) => (_jsxs("li", { className: "other-tasks__list-item", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "other-tasks__list-item-part other-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "other-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "other-tasks__list-item-part", children: task.dueDate })] }, task._id))) })] }), _jsxs("div", { className: "other-tasks", children: [_jsxs("div", { className: "other-tasks__column-headers-div", children: [_jsx("p", { className: "other-tasks__column-headers other-tasks__column-headers--taskname-done", children: "Task" }), _jsx("p", { className: "other-tasks__column-headers", children: "Duration" }), _jsx("p", { className: "other-tasks__column-headers other-tasks__column-headers--due-done", children: "Due" })] }), _jsx("ul", { className: "other-tasks__list", children: otherTasksDone.map((task) => (_jsxs("li", { className: "other-tasks__list-item other-tasks__list-item--done", onClick: () => handleListItemClick(task), children: [_jsx("div", { className: "other-tasks__list-item-part other-tasks__list-item-part--title", children: task.taskName }), _jsxs("div", { className: "other-tasks__list-item-part", children: [task.minutes, " mins"] }), _jsx("div", { className: "other-tasks__list-item-part", children: task.dueDate }), _jsx("div", { className: "other-tasks__icon", children: _jsx(InitialIcon, { username: task.doneBy, inTaskComponent: inTaskComponent }) })] }, task._id))) })] })] })) }));
}
