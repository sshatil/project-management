import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

// create project
const createProject = asyncHandler(async (req, res) => {
  const { projectName, startingDate, finishingDate, userId } = req.body;
  const project = await Project.create({
    projectName,
    user: req.user._id,
    users: [req.user._id],
    startingDate,
    finishingDate,
  });
  if (project) {
    res.status(201).json(project);
  }
});

// update project
const updateProject = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const addUsers = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  );
  res.json(addUsers);
  if (!addUsers) {
    res.status(404);
    throw new Error("Project not Found");
  }
});

// get project

const getProject = asyncHandler(async (req, res) => {
  const allProjects = await Project.find({
    users: { $elemMatch: { $eq: req.user._id } },
  });
  res.json(allProjects);
});

export { createProject, updateProject, getProject };
