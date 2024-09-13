import express from "express";

import {
  createTask,
  updateTask,
  getTask,
  deleteTask,
  updateTaskStatus,
  changeAssignedTo,
  changeReviewer,
  createCommentTask,
  editCommentTask,
  deleteCommentTask,
} from "../controller/task.js";

const taskRoute = express.Router();

// Basic Task Routes
taskRoute.post("/tasks", createTask); // Create a new task
taskRoute.get("/tasks/:taskId", getTask); // Get a specific task by ID
taskRoute.put("/tasks/:taskId", updateTask); // Update a specific task
taskRoute.delete("/tasks/:taskId", deleteTask); // Delete a specific task

// Task status and assignment updates
taskRoute.put("/tasks/:taskId/status", updateTaskStatus); // Update task status
taskRoute.put("/tasks/:taskId/reviewer", changeReviewer); // Change task reviewer
taskRoute.put("/tasks/:taskId/assignedTo", changeAssignedTo); // Change task assignee

// Comment Routes
taskRoute.post("/tasks/:taskId/comments", createCommentTask); // Add a new comment to a task
taskRoute.put("/tasks/:taskId/comments/:commentId", editCommentTask); // Edit a specific comment by ID
taskRoute.delete("/tasks/:taskId/comments/:commentId", deleteCommentTask); // Delete a specific comment by ID
