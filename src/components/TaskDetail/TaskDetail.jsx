import "./TaskDetail.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

  //   console.log("selectedTask: ", selectedTask); // works

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
    let doneBy = selectedTask.doneBy;

    // Retrieve the token from local storage (to get username)
    const token = localStorage.getItem("token");

    // Decode the token to get the username
    let username = "";
    if (token) {
      const decoded = jwtDecode(token);
      username = decoded.username; // Access the username from the decoded token
    }

    if (!selectedTask?.doneBy) {
      return alert(
        "Developer error. Old task, no 'doneBy'. Task not updated. Delete this task! "
      );
    }

    if (selectedTask?.doneBy === "not-done") {
      doneBy = username;
    }

    if (selectedTask?.doneBy !== "not-done") {
      doneBy = "not-done";
    }

    try {
      const response = await axios.patch("/api/tasks/update-done", {
        done: toggledDone,
        taskId: selectedTask?._id,
        doneBy,
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
  const handleDeleteTask = async () => {
    console.log("click");
    const taskId = selectedTask?._id;

    // Error handling
    if (!taskId) {
      return alert("Developer error. No task id.");
    }
    console.log("taskId: ", taskId); // this works fine!

    try {
      const response = await axios.delete("/api/tasks/delete", {
        data: { taskId },
      });

      if (response.status === 200) {
        setIsEdit(false);
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
        alert(`An error occurred, couldn't delete task.`);
      }
    }
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
            <h2 className="task-detail-overlay-form__h2">
              EDIT: {selectedTask?.taskName}
            </h2>

            <label for="task-description">Task description</label>
            <input
              id="task-description"
              type="text"
              placeholder="Task description"
              className="task-detail-overlay-form__input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label for="minutes">Time</label>
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

            <label for="repeat">Repeat</label>
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
            <div className="task-detail-overlay-form__button-container">
              <button
                className="task-detail-overlay__button"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                className="task-detail-overlay-form__button-submit"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
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
