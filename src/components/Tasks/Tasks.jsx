import "./Tasks.scss";
import { useState } from "react";
import { format } from "date-fns";
import DailyTasks from "../DailyTasks/DailyTasks";
import AddTasks from "../AddTasks/AddTasks";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import OtherTasks from "../OtherTasks/OtherTasks";

export default function Tasks({ homeName }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  // const [tasks, setTasks] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMonday(new Date())
  );

  // Current week for further use as ISO string
  const currentWeekISO = currentWeekStart.toISOString().substring(0, 10);

  // Function to get the Monday of the given date's week
  function getMonday(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday (0)
    return new Date(date.setDate(diff));
  }

  // Format the week start date as "WC 16th Sep 2024"
  const formattedWeekStart = format(currentWeekStart, "'WC' do MMM yyyy");

  // Handle previous week click
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => {
      const previousWeek = new Date(prev);
      previousWeek.setDate(previousWeek.getDate() - 7);
      return previousWeek;
    });
  };

  // Handle next week click
  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const nextWeek = new Date(prev);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    });
  };

  // show add task overlay
  const handleAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  return (
    <div className="tasks-all">
      <div className="tasks-header">
        <button onClick={goToPreviousWeek} className="tasks-button">
          ←
        </button>
        <h2>{formattedWeekStart}</h2>
        <button onClick={goToNextWeek} className="tasks-button">
          →
        </button>
      </div>
      <div className="tasks-content">
        <h3 className="tasks-content__h3">Daily</h3>
        <DailyTasks homeName={homeName} currentWeekISO={currentWeekISO} />

        <h3 className="tasks-content__h3">Weekly</h3>
        <WeeklyTasks homeName={homeName} currentWeekISO={currentWeekISO} />

        <h3 className="tasks-content__h3">Other</h3>
        <OtherTasks homeName={homeName} currentWeekISO={currentWeekISO} />
        <div className="tasks-content__button-div">
          <button className="tasks-content__button" onClick={handleAddTask}>
            ADD TASK
          </button>
        </div>
        <AddTasks
          homeName={homeName}
          isAddTaskOpen={isAddTaskOpen}
          handleCloseAddTask={handleCloseAddTask}
          currentWeekISO={currentWeekISO}
        />
      </div>
    </div>
  );

  //     // To check if tasks object empty
  //     if (Object.keys(tasks).length === 0) {
  //   }
}
