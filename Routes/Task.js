import express from "express";
import { verifyJwtToken } from "../middleware/Verify.js";
import {
  CreateTask,
  DeleteTask,
  getTask,
  getTasks,
  UpdateTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  getSubtasks,
  getCollaborators,
  deleteCollaborator
} from "../Controllers/Task.js";
const router = express.Router();

router.post("/create", verifyJwtToken, CreateTask);
router.delete("/:id", verifyJwtToken, DeleteTask);
router.put("/:id", verifyJwtToken, UpdateTask);
router.get("/:id", verifyJwtToken, getTask);
router.get("/", verifyJwtToken, getTasks);

router.post("/:taskId/subtask", verifyJwtToken, createSubtask);
router.get("/:taskId/subtask", verifyJwtToken, getSubtasks);
router.put("/:taskId/subtask/:subtaskId", verifyJwtToken, updateSubtask);
router.delete("/:taskId/subtask/:subtaskId", verifyJwtToken, deleteSubtask);


router.get("/:taskId/collaborators", verifyJwtToken, getCollaborators);
router.delete("/:taskId/collaborator/:userId", verifyJwtToken, deleteCollaborator);

export default router;
