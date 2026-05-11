import { useState } from "react";

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (newText.trim() === "") return;
    onUpdate(task._id, newText, task.completed);
    setIsEditing(false);
  };

  const handleComplete = () => {
    onUpdate(task._id, task.text, !task.completed);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleComplete}
      />

      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
