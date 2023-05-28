import express from "express";
const router = express.Router();
import {
  createProject,
  addUser,
  getProject,
  updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getProject);
router.route("/:id").post(protect, createProject).put(protect, updateProject);
router.route("/addUser/:id").put(protect, addUser);

export default router;
