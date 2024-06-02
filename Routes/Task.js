import express from "express";
import { verifyJwtToken } from "../middleware/Verify.js";
import {
  CreateTask,
  getTask,
  getTasks,
  UpdateTask,
} from "../Controllers/Task.js";
const router = express.Router();

router.post("/create", verifyJwtToken, CreateTask);
router.put("/:id", verifyJwtToken, UpdateTask);
router.get("/:id", verifyJwtToken, getTask);
router.get("/", verifyJwtToken, getTasks);

export default router;
