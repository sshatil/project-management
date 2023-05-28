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

// add multiple user
const addUser = asyncHandler(async (req, res) => {
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

// update project
const updateProject = asyncHandler(async (req, res) => {
  const { projectName, startingDate, finishingDate, userId, status } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    project.projectName = projectName;
    project.startingDate = startingDate;
    project.finishingDate = finishingDate;
    project.status = status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// objectId1.equals(objectId2)
// delete project
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    if (project.user.equals(req.user._id)) {
      res.json({ msg: "User deleted" });
    } else {
      res.status(404);
      throw new Error("Only admin can delete this project");
    }
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// remove user
const removeUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const projectId = req.params.id;

  const removeUsers = await Project.findByIdAndUpdate(
    projectId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  );

  if (!removeUsers) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(removeUsers);
});

export {
  createProject,
  addUser,
  getProject,
  updateProject,
  deleteProject,
  removeUser,
};
