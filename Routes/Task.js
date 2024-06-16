import express from "express";
import { verifyJwtToken } from "../middleware/Verify.js";
import {
  CreateTask,
  DeleteTask,
  getTask,
  getTasks,
  UpdateTask,
} from "../Controllers/Task.js";
const router = express.Router();

router.post("/create", verifyJwtToken, CreateTask);
router.delete("/:id", verifyJwtToken, DeleteTask);
router.put("/:id", verifyJwtToken, UpdateTask);
router.get("/:id", verifyJwtToken, getTask);
router.get("/", verifyJwtToken, getTasks);

export default router;
