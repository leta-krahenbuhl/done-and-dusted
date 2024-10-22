import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./TaskDetail.scss";
import { useState } from "react";
import { editTask, updateDone, deleteTask } from "../../utils/axiosCalls";
import { getUsernameFromToken } from "../../utils/user";
export default function TaskDetail({ selectedTask, closeTaskDetail, isTaskDetailOpen, refreshTasks, }) {
    const [isEdit, setIsEdit] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [minutes, setMinutes] = useState(5);
    const [dueDate, setDueDate] = useState("");
    const [repeat, setRepeat] = useState("not selected");
    const [taskId, setTaskId] = useState("");
    // Update states when entering edit mode
    const handleEditClick = () => {
        setTaskName((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.taskName) || "");
        setMinutes((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.minutes) || 5);
        setDueDate((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.dueDate) || "");
        setRepeat((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.repeat) || "not selected");
        setTaskId((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask._id) || "");
        setIsEdit(true);
    };
    // Edit task form submit
    const handleSubmitEditTask = async (e) => {
        e.preventDefault();
        // Input validation
        if (!taskName) {
            return alert("Please enter a task description.");
        }
        if (!taskId) {
            return alert("Developer error. No task ID.");
        }
        try {
            await editTask(taskName, minutes, repeat, dueDate, taskId);
            setIsEdit(false);
            refreshTasks();
            closeTaskDetail();
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("An unknown error occurred.");
            }
        }
    };
    // Cancel
    const handleCancel = () => {
        closeTaskDetail();
        setIsEdit(false);
    };
    // Handle marking as done / undone
    const handleDone = async () => {
        const toggledDone = !(selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.done);
        let doneBy = (selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.doneBy) || "unknown";
        const username = getUsernameFromToken() || "unknown";
        if (!(selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.doneBy)) {
            return alert("Developer error. Old task, no 'doneBy'. Task not updated. Delete this task! ");
        }
        if ((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.doneBy) === "not-done") {
            doneBy = username;
        }
        if ((selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.doneBy) !== "not-done") {
            doneBy = "not-done";
        }
        const done = toggledDone;
        const taskId = selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask._id;
        try {
            const response = await updateDone(done, taskId, doneBy);
            if (response.status === 200) {
                closeTaskDetail();
                refreshTasks();
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            // Specify the type as unknown
            console.error("Error:", error);
            // Type narrowing to check if it's an AxiosError
            if (error instanceof Error) {
                // If you are using Axios, you can check for response structure
                const axiosError = error;
                if (axiosError.response &&
                    axiosError.response.data &&
                    axiosError.response.data.message) {
                    alert(axiosError.response.data.message);
                }
                else {
                    alert(`Error: ${error.message}`); // General error message
                }
            }
            else {
                alert(`An unknown error occurred.`);
            }
        }
        closeTaskDetail();
        setIsEdit(false);
    };
    // Delete task
    const handleDeleteTask = async () => {
        const taskId = selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask._id;
        // Error handling
        if (!taskId) {
            return alert("No task id");
        }
        try {
            const response = await deleteTask(taskId);
            if (response && response.status === 204) {
                setIsEdit(false);
                refreshTasks();
                closeTaskDetail();
            }
            else if (response) {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert(`An unknown error occurred, couldn't delete task.`);
            }
        }
    };
    if (!isTaskDetailOpen)
        return null;
    return (_jsx("div", { className: "task-detail-overlay", onClick: closeTaskDetail, children: _jsxs("div", { className: "task-detail-overlay__content", onClick: (e) => e.stopPropagation(), children: [!isEdit ? (_jsxs("div", { className: "task-detail-overlay__text-container", children: [_jsx("h2", { className: "task-detail-overlay__h2", children: selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.taskName }), _jsxs("div", { className: "task-detail-overlay__task-attributes", children: [_jsxs("div", { className: "task-detail-overlay__attribute-container", children: [_jsx("p", { className: "task-detail-overlay__task-attribute-legend", children: "Time:" }), _jsxs("p", { className: "task-detail-overlay__task-attribute", children: [selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.minutes, " mins"] })] }), _jsxs("div", { className: "task-detail-overlay__attribute-container", children: [_jsx("p", { className: "task-detail-overlay__task-attribute-legend", children: "Due:" }), _jsx("p", { className: "task-detail-overlay__task-attribute", children: selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.dueDate })] }), _jsxs("div", { className: "task-detail-overlay__attribute-container", children: [_jsx("p", { className: "task-detail-overlay__task-attribute-legend", children: "Repeat:" }), _jsx("p", { className: "task-detail-overlay__task-attribute", children: selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.repeat })] })] }), _jsxs("div", { className: "task-detail-overlay__buttons", children: [_jsx("button", { className: "task-detail-overlay__button task-detail-overlay__button--done", onClick: handleDone, children: !(selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.done) ? "DONE!" : "Mark as undone" }), _jsxs("div", { className: "task-detail-overlay__button-container", children: [_jsx("button", { className: "task-detail-overlay__button", onClick: handleEditClick, children: "EDIT" }), _jsx("button", { className: "task-detail-overlay__button", onClick: handleDeleteTask, children: "DELETE" }), _jsx("button", { className: "task-detail-overlay__button", onClick: handleCancel, children: "CANCEL" })] })] })] })) : (_jsxs("form", { onSubmit: handleSubmitEditTask, className: "task-detail-overlay-form", children: [_jsxs("h2", { className: "task-detail-overlay-form__h2", children: ["EDIT: ", selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.taskName] }), _jsx("label", { htmlFor: "task-description", children: "Task description" }), _jsx("input", { id: "task-description", type: "text", placeholder: "Task description", className: "task-detail-overlay-form__input", value: taskName, onChange: (e) => setTaskName(e.target.value), required: true }), _jsx("label", { htmlFor: "minutes", children: "Time" }), _jsxs("select", { id: "minutes", name: "minutes", className: "add-task-overlay-form__input", value: minutes, onChange: (e) => setMinutes(Number(e.target.value)), children: [_jsx("option", { value: "5", children: "5mins" }), _jsx("option", { value: "10", children: "10mins" }), _jsx("option", { value: "15", children: "15mins" }), _jsx("option", { value: "20", children: "20mins" }), _jsx("option", { value: "30", children: "30mins" }), _jsx("option", { value: "45", children: "45mins" }), _jsx("option", { value: "60", children: "1h" })] }), _jsx("label", { htmlFor: "due-date", children: "Due" }), _jsx("input", { id: "due-date", type: "date", className: "task-detail-overlay-form__input", value: dueDate, onChange: (e) => setDueDate(e.target.value), required: true }), _jsx("label", { htmlFor: "repeat", children: "Repeat" }), _jsxs("select", { id: "repeat", name: "repeat", className: "add-task-overlay-form__input", value: repeat, onChange: (e) => setRepeat(e.target.value), children: [_jsx("option", { value: "daily", children: "daily" }), _jsx("option", { value: "weekly", children: "weekly" }), _jsx("option", { value: "other", children: "other" })] }), _jsxs("div", { className: "task-detail-overlay-form__button-container", children: [_jsx("button", { className: "task-detail-overlay__button", onClick: handleCancel, children: "CANCEL" }), _jsx("button", { className: "task-detail-overlay-form__button-submit", type: "submit", children: "SUBMIT" })] })] })), _jsx("button", { onClick: closeTaskDetail, className: "task-detail-overlay__button-close", children: "\u00D7" })] }) }));
}
