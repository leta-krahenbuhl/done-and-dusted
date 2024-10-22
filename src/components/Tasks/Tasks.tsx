import "./Tasks.scss";
import { useEffect, useState } from "react";
import DailyTasks from "../DailyTasks/DailyTasks";
import AddTasks from "../AddTasks/AddTasks";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import OtherTasks from "../OtherTasks/OtherTasks";
import TaskDetail from "../TaskDetail/TaskDetail";
import WeekSlider from "../WeekSlider/WeekSlider";
import { Task } from "../../types/interfaces";

interface TasksProps {
  homeName: string;
}

// Function to get the Monday of the current week
function getMonday(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday (0)
  return new Date(date.setDate(diff));
}

export default function Tasks({ homeName }: TasksProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentWeekISO, setCurrentWeekISO] = useState("");
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);

  // Set currentWeekISO on initial render
  useEffect(() => {
    const initialWeekStart = getMonday(new Date()); // Get the Monday of the current week
    const initialWeekISO = initialWeekStart.toISOString().substring(0, 10);
    setCurrentWeekISO(initialWeekISO); // Set the currentWeekISO on the first render
  }, []);

  // Function to refresh tasks without reloading the page
  // Reloading page goes back to current week, which may not be
  // where task was added/edited
  const refreshTasks = () => {
    setTaskRefreshTrigger((prev) => !prev); // Toggle state to trigger re-fetching tasks
  };

  // Only render tasks when currentWeekISO has been set
  if (!currentWeekISO) {
    return <div>Loading tasks...</div>;
  }

  // show add task overlay
  const handleAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  // handle list item click
  const handleListItemClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  // close list item details
  const closeTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  return (
    <div className="tasks-all">
      <WeekSlider setCurrentWeek={setCurrentWeekISO} />
      <div className="tasks-content">
        <div className="tasks-content__headers">
          <h3 className="tasks-content__h3">Daily</h3>
          <h3 className="tasks-content__h3">Done (daily)</h3>
        </div>
        <DailyTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
          taskRefreshTrigger={taskRefreshTrigger}
        />
        <div className="tasks-content__headers">
          <h3 className="tasks-content__h3">Weekly</h3>
          <h3 className="tasks-content__h3">Done (weekly)</h3>
        </div>
        <WeeklyTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
          taskRefreshTrigger={taskRefreshTrigger}
        />
        <div className="tasks-content__headers">
          <h3 className="tasks-content__h3">Other</h3>
          <h3 className="tasks-content__h3">Done (other)</h3>
        </div>
        <OtherTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
          taskRefreshTrigger={taskRefreshTrigger}
        />
        <div className="tasks-content__button-div">
          <button className="tasks-content__button" onClick={handleAddTask}>
            ADD TASK
          </button>
        </div>

        <AddTasks
          homeName={homeName}
          isAddTaskOpen={isAddTaskOpen}
          setIsAddTaskOpen={setIsAddTaskOpen}
          handleCloseAddTask={handleCloseAddTask}
          refreshTasks={refreshTasks}
        />

        <TaskDetail
          isTaskDetailOpen={isTaskDetailOpen}
          selectedTask={selectedTask}
          closeTaskDetail={closeTaskDetail}
          refreshTasks={refreshTasks}
        />
      </div>
    </div>
  );
}
