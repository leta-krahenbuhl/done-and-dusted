import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Tasks.scss";
import { useEffect, useState } from "react";
import DailyTasks from "../DailyTasks/DailyTasks";
import AddTasks from "../AddTasks/AddTasks";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import OtherTasks from "../OtherTasks/OtherTasks";
import TaskDetail from "../TaskDetail/TaskDetail";
import WeekSlider from "../WeekSlider/WeekSlider";
// Function to get the Monday of the current week
function getMonday(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday (0)
    return new Date(date.setDate(diff));
}
export default function Tasks({ homeName }) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [currentWeekISO, setCurrentWeekISO] = useState("");
    const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);
    // Set currentWeekISO on initial render
    useEffect(() => {
        const initialWeekStart = getMonday(new Date()); // Get the Monday of the current week
        const initialWeekISO = initialWeekStart.toISOString().substring(0, 10);
        setCurrentWeekISO(initialWeekISO); // Set the currentWeekISO on the first render
    }, []);
    // Function to refresh tasks without reloading the page
    // Reloading page goes back to current week, which may not be
    // where task was added/edited
    const refreshTasks = () => {
        setTaskRefreshTrigger((prev) => !prev); // Toggle state to trigger re-fetching tasks
    };
    // Only render tasks when currentWeekISO has been set
    if (!currentWeekISO) {
        return _jsx("div", { children: "Loading tasks..." });
    }
    // show add task overlay
    const handleAddTask = () => {
        setIsAddTaskOpen(true);
    };
    const handleCloseAddTask = () => {
        setIsAddTaskOpen(false);
    };
    // handle list item click
    const handleListItemClick = (task) => {
        setSelectedTask(task);
        setIsTaskDetailOpen(true);
    };
    // close list item details
    const closeTaskDetail = () => {
        setIsTaskDetailOpen(false);
    };
    return (_jsxs("div", { className: "tasks-all", children: [_jsx(WeekSlider, { setCurrentWeek: setCurrentWeekISO }), _jsxs("div", { className: "tasks-content", children: [_jsxs("div", { className: "tasks-content__headers", children: [_jsx("h3", { className: "tasks-content__h3", children: "Daily" }), _jsx("h3", { className: "tasks-content__h3", children: "Done (daily)" })] }), _jsx(DailyTasks, { homeName: homeName, currentWeekISO: currentWeekISO, handleListItemClick: handleListItemClick, taskRefreshTrigger: taskRefreshTrigger }), _jsxs("div", { className: "tasks-content__headers", children: [_jsx("h3", { className: "tasks-content__h3", children: "Weekly" }), _jsx("h3", { className: "tasks-content__h3", children: "Done (weekly)" })] }), _jsx(WeeklyTasks, { homeName: homeName, currentWeekISO: currentWeekISO, handleListItemClick: handleListItemClick, taskRefreshTrigger: taskRefreshTrigger }), _jsxs("div", { className: "tasks-content__headers", children: [_jsx("h3", { className: "tasks-content__h3", children: "Other" }), _jsx("h3", { className: "tasks-content__h3", children: "Done (other)" })] }), _jsx(OtherTasks, { homeName: homeName, currentWeekISO: currentWeekISO, handleListItemClick: handleListItemClick, taskRefreshTrigger: taskRefreshTrigger }), _jsx("div", { className: "tasks-content__button-div", children: _jsx("button", { className: "tasks-content__button", onClick: handleAddTask, children: "ADD TASK" }) }), _jsx(AddTasks, { homeName: homeName, isAddTaskOpen: isAddTaskOpen, setIsAddTaskOpen: setIsAddTaskOpen, handleCloseAddTask: handleCloseAddTask, refreshTasks: refreshTasks }), _jsx(TaskDetail, { isTaskDetailOpen: isTaskDetailOpen, selectedTask: selectedTask, closeTaskDetail: closeTaskDetail, refreshTasks: refreshTasks })] })] }));
}
