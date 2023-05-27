import express from "express";
const router = express.Router();
import {
  createProject,
  updateProject,
  getProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getProject);
router.route("/:id").post(protect, createProject).put(protect, updateProject);

export default router;
