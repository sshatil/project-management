import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import mongoose from "mongoose";

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

// project details
const projectDetails = asyncHandler(async (req, res) => {
  const singleProject = await Project.findById(req.params.id).populate([
    { path: "users", select: "-password" },
    { path: "tasks.assignTo", select: "-password" },
  ]);
  res.json(singleProject);
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
      await project.deleteOne();
      res.json({ msg: "Project deleted" });
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

// create task for specific user
const createTask = asyncHandler(async (req, res) => {
  const { taskName, status, dueDate, assignTo } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    const task = {
      taskName,
      status,
      dueDate,
      assignTo: new mongoose.Types.ObjectId(assignTo),
    };
    project.tasks.push(task);
    await project.save();
    res.status(201).json({ msg: "Task added" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// update task
const updateTask = asyncHandler(async (req, res) => {
  const { taskName, status, dueDate, assignTo } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    const taskId = req.params.taskId;
    const task = project.tasks.find((p) => p._id.toString() === taskId);
    if (task) {
      task.taskName = taskName;
      task.status = status;
      task.dueDate = dueDate;

      const updatedTask = await project.save();
      res.json(updatedTask);
    } else {
      res.json({ err: "Task not found" });
    }
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// delete project
const deleteTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    const taskId = req.params.taskId;
    const taskIndex = project.tasks.findIndex(
      (p) => p._id.toString() === taskId
    );
    if (taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1); // Remove the task from the tasks array

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.json({ err: "Task not found" });
    }
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

export {
  createProject,
  addUser,
  getProject,
  updateProject,
  deleteProject,
  removeUser,
  createTask,
  updateTask,
  deleteTask,
  projectDetails,
};
