import express from "express";
// import { createProject, deleteProject, getProjectInfo } from "../controller/project";

const projectRouter = express.Router();

// add user check auth midleware here and also add jwt token generation in login function
// projectRouter.post("/", createProject);


// projectRouter.delete("/", deleteProject);

// projectRouter.get("/:projectId", getProjectInfo);


export {
    projectRouter
}


