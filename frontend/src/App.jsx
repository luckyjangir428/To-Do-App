import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";


function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data));
  }, []);

  // Add task
  const addTask = () => {
    if (!text) return alert("Task cannot be empty!");

    axios.post("http://localhost:5000/add", { text })
      .then(res => setTasks([...tasks, res.data]));

    setText("");
  };

  const updateTask = (id, newText) => {
  axios.put(`http://localhost:5000/update/${id}`, { text: newText })
    .then(res => {
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    });
};

const deleteTask = (id) => {
  axios.delete(`http://localhost:5000/delete/${id}`)
    .then(() => setTasks(tasks.filter(t => t._id !== id)));
};

  return (
    <div>
      <h1>MERN To-Do App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>{t.text}</li>
        ))} 
      </ul>
      
      {tasks.map(task => (
  <TaskItem
    key={task._id}
    task={task}
    onDelete={deleteTask}
    onUpdate={updateTask}
  />
))}
    </div>
  );
}

export default App;