import "./TaskDetail.scss";
import { useState } from "react";
import { editTask, updateDone, deleteTask } from "../../utils/axios";
import { getUsernameFromToken } from "../../utils/user";
import { Task } from "../../types/interfaces";

interface TaskDetailProps {
  selectedTask: Task | null;
  closeTaskDetail: () => void;
  isTaskDetailOpen: boolean;
  refreshTasks: () => void;
}

export default function TaskDetail({
  selectedTask,
  closeTaskDetail,
  isTaskDetailOpen,
  refreshTasks,
}: TaskDetailProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [minutes, setMinutes] = useState<number | string>("");
  const [dueDate, setDueDate] = useState("");
  const [repeat, setRepeat] = useState("");
  const [taskId, setTaskId] = useState("");

  // Update states when entering edit mode
  const handleEditClick = () => {
    setTaskName(selectedTask?.taskName || "");
    setMinutes(selectedTask?.minutes || "");
    setDueDate(selectedTask?.dueDate || "");
    setRepeat(selectedTask?.repeat || "");
    setTaskId(selectedTask?._id || "");
    setIsEdit(true);
  };

  // Edit task form submit
  const handleSubmitEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
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
    const toggledDone = !selectedTask?.done;
    let doneBy = selectedTask?.doneBy;

    const username = getUsernameFromToken() || "unknown";

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

    const done = toggledDone;
    const taskId = selectedTask?._id;

    try {
      const response = await updateDone(done, taskId, doneBy);

      if (response.status === 200) {
        closeTaskDetail();
        refreshTasks();
      } else {
        alert(response.data.message);
      }
    } catch (error: unknown) {
      // Specify the type as unknown
      console.error("Error:", error);

      // Type narrowing to check if it's an AxiosError
      if (error instanceof Error) {
        // If you are using Axios, you can check for response structure
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };

        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message
        ) {
          alert(axiosError.response.data.message);
        } else {
          alert(`Error: ${error.message}`); // General error message
        }
      } else {
        alert(`An unknown error occurred.`);
      }
    }
    closeTaskDetail();
    setIsEdit(false);
  };

  // Delete task
  const handleDeleteTask = async () => {
    const taskId = selectedTask?._id;

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
      } else if (response) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(`An unknown error occurred, couldn't delete task.`);
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

            <label htmlFor="task-description">Task description</label>
            <input
              id="task-description"
              type="text"
              placeholder="Task description"
              className="task-detail-overlay-form__input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label htmlFor="minutes">Time</label>
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

            <label htmlFor="due-date">Due</label>
            <input
              id="due-date"
              type="date"
              className="task-detail-overlay-form__input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <label htmlFor="repeat">Repeat</label>
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
