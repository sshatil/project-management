import express from "express";
const router = express.Router();
import {
  createProject,
  addUser,
  getProject,
  updateProject,
  deleteProject,
  removeUser,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getProject);
router
  .route("/:id")
  .post(protect, createProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);
router.route("/addUser/:id").put(protect, addUser);
router.route("/removeUsers/:id").put(protect, removeUser);

export default router;
