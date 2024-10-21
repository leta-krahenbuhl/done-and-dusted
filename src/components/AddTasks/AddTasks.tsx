import "./AddTasks.scss";
import { useState, useEffect } from "react";
import { addTask } from "../../utils/axios";

interface AddTasksProps {
  homeName: string;
  isAddTaskOpen: boolean;
  handleCloseAddTask: () => void;
  setIsAddTaskOpen: (value: boolean) => void;
  refreshTasks: () => void;
}

// Utility function to calculate the ISO week start date (Monday) for a given date
function getISOWeekStartDate(date: string) {
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
  refreshTasks,
}: AddTasksProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(5);
  const [repeat, setRepeat] = useState("daily");
  const [dueDate, setDueDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          refreshTasks();
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unknown error occurred.");
        }
      }
      return; // Exit function after handling "other"
    }

    // If repeate "daily" or "weekly" (meaning both startDate and endDate are present)
    if (startDate && endDate) {
      const tasks: string[] = []; // will be an array of dates, one for each task that needs to be created
      const currentDate: Date = new Date(startDate);
      const lastDate: Date = new Date(endDate);

      // Calculate the difference in days between startDate and endDate
      const dateDifferenceInDays =
        (lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24); // Use getTime() so TS understands it can substract

      // Check if the repeat type is daily and the task period doesn't exceed 14-days
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

      // Check if the repeat type is weekly but the date range is less than 7 days
      if (repeat === "weekly" && dateDifferenceInDays < 6) {
        return alert(
          "For a weekly task, the date range must be at least 7 days."
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
        refreshTasks();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unknown error occurred.");
        }
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
            onChange={(e) => setMinutes(Number(e.target.value))}
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
