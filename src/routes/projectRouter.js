// POST /projects: Create a new project.
// GET /projects: Retrieve a list of projects.
// GET /projects/
// : Retrieve a specific project by ID.
// PUT /projects/
// : Update a specific project.
// DELETE /projects/
// : Delete a specific project.



import express from "express";
import { createProject, deleteProject, getProjectInfo } from "../controller/project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const projectRouter = express.Router();


projectRouter.post("/", authMiddleware, createProject);


// projectRouter.delete("/", deleteProject);

// projectRouter.get("/:projectId", getProjectInfo);




export {
    projectRouter
}


