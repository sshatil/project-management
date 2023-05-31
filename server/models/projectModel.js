import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Done"],
      default: "Not Started",
    },
    dueDate: {
      type: String,
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // project: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    // },
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    user: {
      // owner
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startingDate: {
      type: String,
    },
    finishingDate: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Done"],
      default: "Not Started",
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Projects", projectSchema);

export default Project;
