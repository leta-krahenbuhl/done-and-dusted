import "./TaskDetail.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskDetail({
  selectedTask,
  closeTaskDetail,
  isTaskDetailOpen,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [repeat, setRepeat] = useState("");
  const [taskId, setTaskId] = useState("");
  //   const [done, setDone] = useState("");

  // Update state when entering edit mode
  const handleEditClick = () => {
    setTaskName(selectedTask?.taskName || "");
    setMinutes(selectedTask?.minutes || "");
    setDueDate(selectedTask?.dueDate || "");
    setRepeat(selectedTask?.repeat || "");
    setTaskId(selectedTask?._id || "");
    setIsEdit(true);
  };

  // Edit task form submit
  const handleSubmitEditTask = async (event) => {
    event.preventDefault();

    // Error handling
    if (!taskName) {
      return alert("Please enter a task description.");
    }
    if (!taskId) {
      return alert("Developer error. No task id.");
    }
    console.log("taskId: ", taskId);
    console.log("selectedTask: ", selectedTask);
    console.log("repeat: ", repeat);

    try {
      const response = await axios.patch("/api/tasks/edit", {
        taskName,
        minutes,
        repeat,
        dueDate,
        taskId,
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert(`An error occurred while editing ${taskName}.`);
      }
    }

    // Code to handle form submission goes here
    setIsEdit(false);
  };

  // Cancel
  const handleCancel = () => {
    closeTaskDetail();
    setIsEdit(false);
  };

  // Handle if task is done
  const handleDone = async () => {
    const toggledDone = !selectedTask?.done;

    try {
      const response = await axios.patch("/api/tasks/update-done", {
        done: toggledDone,
        taskId: selectedTask?._id,
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert(`An error occurred while trying to update this task.`);
      }
    }

    // Code to handle form submission goes here
    setIsEdit(false);
  };

  // Delete task
  const handleDeleteTask = () => {
    console.log("delete clicked");
  };

  if (!isTaskDetailOpen) return null;

  return (
    <div className="task-detail-overlay" onClick={closeTaskDetail}>
      <div
        className="task-detail-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        {!isEdit ? (
          <div className="task-detail-overlay__text-container">
            <h2 className="task-detail-overlay__h2">
              {selectedTask?.taskName}
            </h2>
            <div className="task-detail-overlay__task-attributes">
              <div className="task-detail-overlay__attribute-container">
                <p className="task-detail-overlay__task-attribute-legend">
                  Time:
                </p>
                <p className="task-detail-overlay__task-attribute">
                  {selectedTask?.minutes} mins
                </p>
              </div>

              <div className="task-detail-overlay__attribute-container">
                <p className="task-detail-overlay__task-attribute-legend">
                  Due:
                </p>
                <p className="task-detail-overlay__task-attribute">
                  {selectedTask?.dueDate}
                </p>
              </div>

              <div className="task-detail-overlay__attribute-container">
                <p className="task-detail-overlay__task-attribute-legend">
                  Repeat:
                </p>
                <p className="task-detail-overlay__task-attribute">
                  {selectedTask?.repeat}
                </p>
              </div>
            </div>
            <div className="task-detail-overlay__buttons">
              <button
                className="task-detail-overlay__button task-detail-overlay__button--done"
                onClick={handleDone}
              >
                {!selectedTask?.done ? "DONE!" : "Mark as undone"}
              </button>
              <div className="task-detail-overlay__button-container">
                <button
                  className="task-detail-overlay__button"
                  onClick={handleEditClick}
                >
                  EDIT
                </button>
                <button
                  className="task-detail-overlay__button"
                  onClick={handleDeleteTask}
                >
                  DELETE
                </button>
                <button
                  className="task-detail-overlay__button"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitEditTask}
            className="task-detail-overlay-form"
          >
            <label for="task-description">Task</label>
            <input
              id="task-description"
              type="text"
              placeholder="Task description"
              className="task-detail-overlay-form__input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label for="minutes">Task length</label>
            <select
              id="minutes"
              name="minutes"
              className="add-task-overlay-form__input"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              <option value="5">5mins</option>
              <option value="10">10mins</option>
              <option value="15">15mins</option>
              <option value="20">20mins</option>
              <option value="30">30mins</option>
              <option value="45">45mins</option>
              <option value="60">1h</option>
            </select>

            <label for="due-date">Due</label>
            <input
              id="due-date"
              type="date"
              className="task-detail-overlay-form__input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <label for="repeat">How often is this task due?</label>
            <select
              id="repeat"
              name="repeat"
              className="add-task-overlay-form__input"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="other">other</option>
            </select>

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
