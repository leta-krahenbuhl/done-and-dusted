import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./AddTasks.scss";
import { useState, useEffect } from "react";
import { addTask } from "../../utils/axiosCalls";
// Utility function to calculate the ISO week start date (Monday) for a given date
function getISOWeekStartDate(date) {
    const tempDate = new Date(date);
    const day = tempDate.getDay();
    const diff = tempDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(tempDate.setDate(diff));
    return monday.toISOString().split("T")[0];
}
export default function AddTasks({ homeName, isAddTaskOpen, handleCloseAddTask, setIsAddTaskOpen, refreshTasks, }) {
    const [taskName, setTaskName] = useState("");
    const [minutes, setMinutes] = useState(5);
    const [repeat, setRepeat] = useState("not selected");
    const [dueDate, setDueDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // Set the default values for startDate and endDate
    useEffect(() => {
        const today = new Date();
        const twoWeeksFromToday = new Date();
        twoWeeksFromToday.setDate(today.getDate() + 13); // Add 13 days to the current date
        // Format the dates to 'YYYY-MM-DD' to be compatible with the input type="date"
        const formattedToday = today.toISOString().split("T")[0];
        const formattedTwoWeeksFromToday = twoWeeksFromToday
            .toISOString()
            .split("T")[0];
        setStartDate(formattedToday);
        setEndDate(formattedTwoWeeksFromToday);
    }, []);
    // Add task
    const handleAddTask = async (event) => {
        event.preventDefault();
        if (!taskName) {
            return alert("Please enter a task description.");
        }
        // If repeat "other"
        if (repeat === "other") {
            try {
                const isoWeekStart = getISOWeekStartDate(dueDate); // Calculate ISO week for single task due date
                const response = await addTask(taskName, minutes, repeat, homeName, dueDate, isoWeekStart, startDate, endDate);
                if (response.status === 201) {
                    setIsAddTaskOpen(false);
                    refreshTasks();
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
                else {
                    alert("An unknown error occurred.");
                }
            }
            return; // Exit function after handling "other"
        }
        // If repeate "daily" or "weekly" (meaning both startDate and endDate are present)
        if (startDate && endDate) {
            const tasks = []; // will be an array of dates, one for each task that needs to be created
            const currentDate = new Date(startDate);
            const lastDate = new Date(endDate);
            // Calculate the difference in days between startDate and endDate
            const dateDifferenceInDays = (lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24); // Use getTime() so TS understands it can substract
            // Check if the repeat type is daily and the task period doesn't exceed 14-days
            // as I'm on a free MongoDB plan...
            if (repeat === "daily" && dateDifferenceInDays > 13) {
                return alert("Currently you cannot create more than 14 daily tasks at once (to limit data usage). Please select a shorter date range.");
            }
            // Check if the repeat type is weekly and the task period doesn't exceed the 4-week limit
            if (repeat === "weekly" && dateDifferenceInDays > 27) {
                return alert("Currently you cannot create more than 4 weekly tasks at once (to limit data usage). Please select a shorter date range.");
            }
            // Check if the repeat type is weekly but the date range is less than 7 days
            if (repeat === "weekly" && dateDifferenceInDays < 6) {
                return alert("For a weekly task, the date range must be at least 7 days.");
            }
            // Daily repeat logic
            if (repeat === "daily") {
                while (currentDate <= lastDate) {
                    tasks.push(new Date(currentDate).toISOString().split("T")[0]); // Add task with currentDate as dueDate
                    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
                }
            }
            // Weekly repeat logic
            else if (repeat === "weekly") {
                while (currentDate <= lastDate) {
                    const nextSunday = new Date(currentDate);
                    nextSunday.setDate(currentDate.getDate() + (7 - currentDate.getDay())); // Find the upcoming Sunday
                    if (nextSunday <= lastDate) {
                        tasks.push(nextSunday.toISOString().split("T")[0]);
                    }
                    currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
                }
            }
            try {
                // Create each task with its respective dueDate and ISO week
                for (const dueDate of tasks) {
                    const isoWeekStart = getISOWeekStartDate(dueDate); // Calculate the start of the ISO week for the dueDate
                    const response = await addTask(taskName, minutes, repeat, homeName, dueDate, isoWeekStart, startDate, endDate);
                    if (response.status !== 201) {
                        throw new Error(`Failed to create task.`);
                    }
                }
                setIsAddTaskOpen(false);
                refreshTasks();
            }
            catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
                else {
                    alert("An unknown error occurred.");
                }
            }
        }
    };
    if (!isAddTaskOpen)
        return null;
    return (_jsx("div", { className: "add-task-overlay", onClick: handleCloseAddTask, children: _jsxs("div", { className: "add-task-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "add-task-overlay__button-close", onClick: handleCloseAddTask, children: "\u00D7" }), _jsx("h1", { className: "add-task-overlay__h1", children: "Add a Task" }), _jsxs("form", { className: "add-task-overlay-form", onSubmit: handleAddTask, children: [_jsx("input", { type: "text", placeholder: "Task description", className: "add-task-overlay-form__input", value: taskName, onChange: (e) => setTaskName(e.target.value), required: true }), _jsx("label", { htmlFor: "minutes", children: "How much time does this task take?" }), _jsxs("select", { id: "minutes", name: "minutes", className: "add-task-overlay-form__input", value: minutes, onChange: (e) => setMinutes(Number(e.target.value)), children: [_jsx("option", { value: "5", children: "5mins" }), _jsx("option", { value: "10", children: "10mins" }), _jsx("option", { value: "15", children: "15mins" }), _jsx("option", { value: "20", children: "20mins" }), _jsx("option", { value: "30", children: "30mins" }), _jsx("option", { value: "45", children: "45mins" }), _jsx("option", { value: "60", children: "1h" })] }), _jsx("label", { htmlFor: "repeat", children: "How often is this task due?" }), _jsxs("select", { id: "repeat", name: "repeat", className: "add-task-overlay-form__input", value: repeat, onChange: (e) => setRepeat(e.target.value), children: [_jsx("option", { value: "daily", children: "daily" }), _jsx("option", { value: "weekly", children: "weekly" }), _jsx("option", { value: "other", children: "other" })] }), repeat === "daily" || repeat === "weekly" ? (_jsxs(_Fragment, { children: [_jsx("label", { htmlFor: "startDate", children: "Start from" }), _jsx("input", { type: "date", id: "startDate", name: "startDate", className: "add-task-overlay-form__input", value: startDate, onChange: (e) => setStartDate(e.target.value), required: true }), _jsx("label", { htmlFor: "endDate", children: "Until" }), _jsx("input", { type: "date", id: "endDate", name: "endDate", className: "add-task-overlay-form__input", value: endDate, onChange: (e) => setEndDate(e.target.value), required: true })] })) : (
                        /* Render the Due Date input for repeat "other" */
                        _jsxs(_Fragment, { children: [_jsx("label", { htmlFor: "dueDate", children: "Due date" }), _jsx("input", { type: "date", id: "dueDate", name: "dueDate", className: "add-task-overlay-form__input", value: dueDate, onChange: (e) => setDueDate(e.target.value), required: true })] })), _jsx("button", { type: "submit", className: "add-task-overlay-form__button", children: "Submit" })] })] }) }));
}
