import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import api from "../utils/api";

function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks on load
  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  // Create task
  const addTask = async () => {
    if (newTask.trim() === "") return;
    const res = await api.post("/tasks", { text: newTask });
    setTasks([res.data, ...tasks]);
    setNewTask("");
  };

  // Update task (Edit text or toggle complete)
  const updateTask = async (id, text, completed) => {
    const res = await api.put(`/tasks/${id}`, { text, completed });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Hello, {user?.name} 👋</h2>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>

      <div className="task-input-row">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
        />
        <button className="btn-add" onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && <p className="no-tasks">No tasks yet. Add one above!</p>}
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
