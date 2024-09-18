export default function TaskDetail({ selectedTask, closeOverlay }) {
  console.log("TaskDetail Rendered with task:", selectedTask); // Debugging line

  return (
    <div className="task-detail-overlay">
      <div className="task-detail-content">
        <h2>{selectedTask?.taskName}</h2>
        <p>Duration: {selectedTask?.minutes} mins</p>
        <p>Due Date: {selectedTask?.dueDate}</p>
        <button onClick={closeOverlay}>Close</button>
      </div>
    </div>
  );
}
