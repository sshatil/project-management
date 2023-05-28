import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Projects", projectSchema);

export default Project;
