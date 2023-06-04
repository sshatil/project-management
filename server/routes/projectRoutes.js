import express from "express";
const router = express.Router();
import {
  createProject,
  addUser,
  getProject,
  updateProject,
  deleteProject,
  removeUser,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getProject).post(protect, createProject);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);
router.route("/addUser/:id").put(protect, addUser);
router.route("/removeUsers/:id").put(protect, removeUser);
router.route("/task/:id").post(protect, createTask);
// router.route("/:id/tasks/:taskId").put(updateTask);
router.route("/task/:id/:taskId").put(updateTask).delete(protect, deleteTask);

export default router;
