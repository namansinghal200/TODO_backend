import Task from "../models/Task.js";
import dayjs from "dayjs";
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
export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
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
export const DeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    return res.status(201);
  } catch (error) {
    next(error);
  }
};
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    return res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};
export const getTasks = async (req, res, next) => {
  try {
    const type = req.query?.type;
    const day = req.query?.day;
    const { id } = req.user;
    var min, max;
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
    if (type) {
      var tasks = await Task.find({
        userId: id,
        type,
        ...(day && { date: { $lte: new Date(max), $gte: new Date(min) } }),
      });
    } else {
      var tasks = await Task.find({
        userId: id,
        ...(day && { date: { $lte: new Date(max), $gte: new Date(min) } }),
      });
    }
    return res.status(201).json({ tasks });
  } catch (err) {
    next(err);
  }
};
