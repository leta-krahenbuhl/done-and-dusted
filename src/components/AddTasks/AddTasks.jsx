import "./AddTasks.scss";
import { useState } from "react";

export default function AddTasks({
  homeName,
  isAddTaskOpen,
  handleCloseAddTask,
  currentWeekStart,
}) {
  const [taskName, setTaskName] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [repeat, setRepeat] = useState("daily");
  const [dueDate, setDueDate] = useState();

  const handleAddTask = async (e) => {
    // console.log("add tasks clicked"); //works
    e.preventDefault();

    // error handling
    if (!taskName) {
      return alert("Please enter a task description.");
    }

    // error handling
    if (!dueDate) {
      return alert("Please choose a due date.");
    }

    const done = false;
    const dateCreated = new Date();

    // To check date formats. May have to unify at some point?
    // console.log("dateCreated:", dateCreated);
    // console.log("formattedDueDate:", formattedDueDate);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          minutes,
          dateCreated,
          repeat,
          done,
          homeName,
          dueDate,
          week: currentWeekStart,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Task ${taskName} created successfully`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isAddTaskOpen) return null;

  return (
    <div className="add-task-overlay" onClick={handleCloseAddTask}>
      <div
        className="add-task-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-task-overlay__button-close"
          onClick={handleCloseAddTask}
        >
          &times;
        </button>
        <h1 className="add-task-overlay__h1">Add a Task</h1>
        <form className="add-task-overlay-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task description"
            className="add-task-overlay-form__input"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          <label for="minutes">How much time does this task take?</label>
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

          <label htmlFor="dueDate">Due date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="add-task-overlay-form__input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            type="submit"
            className="add-task-overlay-form__button"
            onSubmit={handleAddTask}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
