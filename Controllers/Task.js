import Task from "../models/Task.js";
import dayjs from "dayjs";

// Create Task
export const CreateTask = async (req, res, next) => {
  try {
    const { id } = req.user;
    const completionDate = new Date(req.body.date);
    const task = new Task({ ...req.body, userId: id, date: completionDate });
    const saveTask = await task.save();
    return res.status(201).json({ task: saveTask });
  } catch (error) {
    next(error);
  }
};

// Update Task
export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const DeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(201).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Single Task
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    return res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

// Get All Tasks
export const getTasks = async (req, res, next) => {
  try {
    const type = req.query?.type;
    const day = req.query?.day;
    const { id } = req.user;
    let min, max;
    if (day === "today") {
      min = dayjs().startOf("day").toDate();
      max = dayjs().endOf("day").toDate();
    } else if (day === "week") {
      min = dayjs().startOf("day").toDate();
      max = dayjs().endOf("week").toDate();
    } else if (day === "month") {
      min = dayjs().startOf("day").toDate();
      max = dayjs().endOf("month").toDate();
    }
    const filter = {
      userId: id,
      ...(type && { type }),
      ...(day && { date: { $gte: new Date(min), $lte: new Date(max) } }),
    };
    const tasks = await Task.find(filter);
    return res.status(201).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const getSubtasks = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).populate("subtasks");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ subtasks: task.subtasks });
  } catch (error) {
    next(error);
  }
};

// Create Subtask
export const createSubtask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { name, priority } = req.body; // Extract priority from request body
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const newSubtask = { name, priority: priority || "Low", completed: false }; // Default priority if not provided
    task.subtasks.push(newSubtask);
    await task.save();
    return res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

// Update Subtask
export const updateSubtask = async (req, res, next) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { name, completed, priority } = req.body; // Extract priority from request body
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    if (name !== undefined) subtask.name = name;
    if (completed !== undefined) subtask.completed = completed;
    if (priority !== undefined) subtask.priority = priority;
    await task.save();
    return res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

// Delete Subtask
export const deleteSubtask = async (req, res, next) => {
  try {
    const { taskId, subtaskId } = req.params;

    // Find the task by taskId
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Filter and remove the subtask by subtaskId using findByIdAndDelete
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { subtasks: { _id: subtaskId } } },
      { new: true }
    );

    // Check if the subtask was successfully removed
    if (!updatedTask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    return res.status(201).json({ task: updatedTask });
  } catch (error) {
    next(error);
  }
};
