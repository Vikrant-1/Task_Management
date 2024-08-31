import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    members: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          role: {
            type: String,
            enum: ["admin", "editor", "viewer"],
            default: "editor",
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export { Project };
