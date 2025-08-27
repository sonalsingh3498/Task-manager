import Task from "../models/Task.js";

// Get all tasks for the current user
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

// Update an existing task
export const updateTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to update this task" });
    }

    task.title = title ?? task.title;
    if (completed !== undefined) task.completed = completed;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
