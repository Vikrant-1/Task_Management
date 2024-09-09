import express from "express";
import {
  createProject,
  deleteProject,
  getProjectInfo,
  updateProjectDetails,
  updateProjectTeams,
} from "../controller/project.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { projectMiddleware } from "../middleware/projectMiddleware.js";

const projectRouter = express.Router();

projectRouter.post("/", authMiddleware, createProject);
projectRouter.get("/:projectId", authMiddleware, getProjectInfo);
projectRouter.delete(
  "/:projectId",
  authMiddleware,
  projectMiddleware,
  deleteProject
);
projectRouter.put(
  "/:projectId",
  authMiddleware,
  projectMiddleware,
  updateProjectDetails
);
projectRouter.put(
  "/:projectId/teams",
  authMiddleware,
  projectMiddleware,
  updateProjectTeams
);

export { projectRouter };
