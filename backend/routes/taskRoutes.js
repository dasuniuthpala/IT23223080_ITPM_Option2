const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { category, status, priority } = req.query;
    const filter = {};
    if (category && typeof category === 'string') filter.category = category;
    if (status && typeof status === 'string') filter.status = status;
    if (priority && typeof priority === 'string') filter.priority = priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single task
router.get('/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;
    const task = new Task({
      title: title !== undefined ? String(title) : undefined,
      description: description !== undefined ? String(description) : undefined,
      category: category !== undefined ? String(category) : undefined,
      priority: priority !== undefined ? String(priority) : undefined,
      status: status !== undefined ? String(status) : undefined,
      dueDate: dueDate ? new Date(String(dueDate)) : undefined,
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const { title, description, category, priority, status, dueDate } = req.body;
    const update = {
      title: title !== undefined ? String(title) : undefined,
      description: description !== undefined ? String(description) : undefined,
      category: category !== undefined ? String(category) : undefined,
      priority: priority !== undefined ? String(priority) : undefined,
      status: status !== undefined ? String(status) : undefined,
      dueDate: dueDate !== undefined ? (dueDate ? new Date(String(dueDate)) : null) : undefined,
    };
    const task = await Task.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
