import "./TaskDetail.scss";
import { useState } from "react";

export default function TaskDetail({
  selectedTask,
  closeTaskDetail,
  isTaskDetailOpen,
}) {
  if (!isTaskDetailOpen) return null;

  return (
    <div className="task-detail-overlay" onClick={closeTaskDetail}>
      <div className="task-detail-overlay__content">
        <h2 className="task-detail-overlay__h2">{selectedTask?.taskName}</h2>
        <p>Duration: {selectedTask?.minutes} mins</p>
        <p>Due Date: {selectedTask?.dueDate}</p>
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
