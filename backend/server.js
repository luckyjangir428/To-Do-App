const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("MongoDB Connected"));

const Task = mongoose.model("Task", new mongoose.Schema({
  text: String
}));

// Add task
app.post("/add", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.send(newTask);
});

// Get tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Update a task
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, { text }, { new: true });
  res.send(updatedTask);
});

// Delete a task
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send({ message: "Task deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));