import "./Tasks.scss";
import { useState } from "react";
import { format } from "date-fns";
import DailyTasks from "../DailyTasks/DailyTasks";
import AddTasks from "../AddTasks/AddTasks";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import OtherTasks from "../OtherTasks/OtherTasks";
import TaskDetail from "../TaskDetail/TaskDetail";
import WeekSlider from "../WeekSlider/WeekSlider";

export default function Tasks({ homeName }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentWeekISO, setCurrentWeekISO] = useState("");

  // set currentWeekISO
  const setCurrentWeek = (currentWeekISO) => {
    setCurrentWeekISO(currentWeekISO);
  };

  // show add task overlay
  const handleAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  // handle list item click
  const handleListItemClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  // close list item details
  const closeTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  return (
    <div className="tasks-all">
      <WeekSlider setCurrentWeek={setCurrentWeek} />
      <div className="tasks-content">
        <div className="tasks-content__headers">
          <h3 className="tasks-content__h3">Daily</h3>
          <h3 className="tasks-content__h3">Done</h3>
        </div>
        <DailyTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
        />

        <h3 className="tasks-content__h3">Weekly</h3>
        <WeeklyTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
        />

        <h3 className="tasks-content__h3">Other</h3>
        <OtherTasks
          homeName={homeName}
          currentWeekISO={currentWeekISO}
          handleListItemClick={handleListItemClick}
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
          currentWeekISO={currentWeekISO}
        />

        <TaskDetail
          isTaskDetailOpen={isTaskDetailOpen}
          handleCloseAddTask={handleCloseAddTask}
          selectedTask={selectedTask}
          closeTaskDetail={closeTaskDetail}
        />
      </div>
    </div>
  );
}
