import "./DailyTasks.scss";
import { useState } from "react";

export default function DailyTasks() {
  const [dailyTasks, setDailyTasks] = useState({});

  return (
    <div className="daily-tasks-all">
      <p>daily tasks</p>
    </div>
  );
}

//     // To check if tasks object empty
//     if (Object.keys(tasks).length === 0) {
//   }
