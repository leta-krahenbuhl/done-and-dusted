import "./AddTasks.scss";
import { useState, useEffect } from "react";
import { addTask } from "../../utils/axios";

// Utility function to calculate the ISO week start date (Monday) for a given date
function getISOWeekStartDate(date) {
  const tempDate = new Date(date);
  const day = tempDate.getDay();
  const diff = tempDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(tempDate.setDate(diff));
  return monday.toISOString().split("T")[0];
}

export default function AddTasks({
  homeName,
  isAddTaskOpen,
  handleCloseAddTask,
  setIsAddTaskOpen,
}) {
  const [taskName, setTaskName] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [repeat, setRepeat] = useState("daily");
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

  const handleAddTask = async (e) => {
    e.preventDefault();

    // Error handling
    if (!taskName) {
      return alert("Please enter a task description.");
    }

    // If repeat "other"
    if (repeat === "other") {
      try {
        const isoWeekStart = getISOWeekStartDate(dueDate); // Calculate ISO week for single task due date
        const response = await addTask(
          taskName,
          minutes,
          repeat,
          homeName,
          dueDate,
          isoWeekStart,
          startDate,
          endDate
        );

        if (response.status === 201) {
          setIsAddTaskOpen(false);
          window.location.reload();
        }
      } catch (error) {
        alert(error.message);
      }
      return; // Exit the function after handling "other"
    }

    // If repeate "daily" or "weekly" (meaning both startDate and endDate are present)
    if (startDate && endDate) {
      const tasks = [];
      const currentDate = new Date(startDate);
      const lastDate = new Date(endDate);

      // Calculate the difference in days between startDate and endDate
      const dateDifferenceInDays =
        (lastDate - currentDate) / (1000 * 60 * 60 * 24);

      // Check if the repeat type is daily and the task period doesn't exceed the 14-day limit
      // as I'm on a free MongoDB plan...
      if (repeat === "daily" && dateDifferenceInDays > 13) {
        return alert(
          "Currently you cannot create more than 14 daily tasks at once (to limit data usage). Please select a shorter date range."
        );
      }

      // Check if the repeat type is weekly and the task period doesn't exceed the 4-week limit
      if (repeat === "weekly" && dateDifferenceInDays > 27) {
        return alert(
          "Currently you cannot create more than 4 weekly tasks at once (to limit data usage). Please select a shorter date range."
        );
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
          nextSunday.setDate(
            currentDate.getDate() + (7 - currentDate.getDay())
          ); // Find the upcoming Sunday
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
          const response = await addTask(
            taskName,
            minutes,
            repeat,
            homeName,
            dueDate,
            isoWeekStart,
            startDate,
            endDate
          );

          if (response.status !== 201) {
            throw new Error(`Failed to create task.`);
          }
        }
        setIsAddTaskOpen(false);
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
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

          <label htmlFor="minutes">How much time does this task take?</label>
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

          <label htmlFor="repeat">How often is this task due?</label>
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

          {/* Conditionally render the Date Range input for daily/weekly */}
          {repeat === "daily" || repeat === "weekly" ? (
            <>
              <label htmlFor="startDate">Start from</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="add-task-overlay-form__input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <label htmlFor="endDate">Until</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="add-task-overlay-form__input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </>
          ) : (
            /* Render the Due Date input for repeat "other" */
            <>
              <label htmlFor="dueDate">Due date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="add-task-overlay-form__input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="add-task-overlay-form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
