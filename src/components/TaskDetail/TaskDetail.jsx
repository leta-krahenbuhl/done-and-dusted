import "./TaskDetail.scss";
import { useState, useEffect } from "react";

export default function TaskDetail({
  selectedTask,
  closeTaskDetail,
  isTaskDetailOpen,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Update state when entering edit mode
  const handleEditClick = () => {
    setTaskName(selectedTask?.taskName || "");
    setMinutes(selectedTask?.minutes || "");
    setDueDate(selectedTask?.dueDate || "");
    setIsEdit(true);
  };

  const handleEditTask = (event) => {
    event.preventDefault(); // Prevents the default form submission
    // Your code to handle form submission goes here
    setIsEdit(false); // Exit edit mode after submission (optional)
  };

  const handleCancel = () => {
    closeTaskDetail();
    setIsEdit(false);
  };

  if (!isTaskDetailOpen) return null;

  return (
    <div className="task-detail-overlay" onClick={closeTaskDetail}>
      <div
        className="task-detail-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        {!isEdit ? (
          <>
            <h2 className="task-detail-overlay__h2">
              {selectedTask?.taskName}
            </h2>
            <p>Duration: {selectedTask?.minutes} mins</p>
            <p>Due Date: {selectedTask?.dueDate}</p>
            <button
              className="task-detail-overlay__button"
              onClick={handleEditClick}
            >
              EDIT
            </button>
            <button
              className="task-detail-overlay__button"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </>
        ) : (
          <form onSubmit={handleEditTask} className="task-detail-overlay-form">
            <input
              type="text"
              placeholder="Task description"
              className="task-detail-overlay-form__input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              className="task-detail-overlay-form__input"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              required
            />
            <input
              type="date"
              className="task-detail-overlay-form__input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <button
              className="task-detail-overlay__button-submit"
              type="submit"
            >
              SUBMIT
            </button>
            <button
              className="task-detail-overlay__button"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </form>
        )}
        <button
          onClick={closeTaskDetail}
          className="task-detail-overlay__button-close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
