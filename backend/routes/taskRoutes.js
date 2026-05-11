const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// All task routes are protected
router.use(authMiddleware);

// GET /api/tasks  - Get all tasks of logged-in user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/tasks  - Create new task
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({ text, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /api/tasks/:id  - Update task (Task 3)
router.put("/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/tasks/:id  - Delete task (Task 3)
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
