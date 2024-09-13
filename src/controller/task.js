import { Comment } from "../schema/Comment.schema";
import { Project } from "../schema/Project.schema";
import { Task } from "../schema/Task.schema";
import { User } from "../schema/User.schema";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { zodCreateProjectValidation } from "../zodSchema/zodProjectValidation";
import {
  zodCreateCommentSchema,
  zodGetTaskSchema,
  zodTaskAssigneToSchema,
  zodTaskReviewerSchema,
  zodTaskStatusSchema,
} from "../zodSchema/zodTaskValidation";
import { createComment, deleteComment, editComment } from "./comment";

const createTask = async (req, res) => {
  try {
    const { name, description, projectId, status, assignedTo, reviewer } =
      req.body ?? {};

    const zodCheck = zodCreateProjectValidation.safeParse(req.body);
    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }
    const project = await Project.findById(projectId);

    if (!project) {
      return handleError(res, 401, "Project dies not exists.");
    }

    if (assignedTo) {
      const assigner = await User.findById(assignedTo);
      if (!assigner) {
        return handleError(res, 401, "Assigner Does not exists");
      }
    }

    if (reviewer) {
      const reviewerUser = await User.findById(reviewer);

      if (!reviewerUser) {
        return handleError(res, 401, "Reviewer does not exists");
      }
    }

    const newTask = await Task.create(res.body);

    if (!newTask) {
      return handleError(res, 401, "Failed to create Task");
    }

    return handleSuccess(res, 201, "Successfully created Task", {
      name: newTask.name,
      description: newTask.description,
      projectId: newTask.projectId,
      assignedTo: newTask.assignedTo,
      reviewer: newTask.reviewer,
      status: newTask.status,
      createdAt: newTask.createdAt,
    });
  } catch (error) {
    handleError(res, 500, "Failed to create task");
  }
};

const getTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const zodCheck = zodGetTaskSchema.safeParse({
      id: taskId,
    });
    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return handleError(res, 401, "Failed to get task");
    }

    return handleSuccess(res, 200, "Successfully Get Task", task);
  } catch (error) {
    handleError(res, 500, "Failed to get task");
  }
};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    const zodCheck = zodGetTaskSchema.safeParse({
      id: taskId,
    });

    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }
    await Task.findByIdAndDelete(taskId);
    return handleSuccess(res, 200, "Task deleted Successfully.");
  } catch (error) {
    handleError(res, 500, "Failed to delete Task");
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.query;

    const zodCheck = zodTaskStatusSchema.safeParse({
      id: taskId,
      status: status,
    });

    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      status: status,
    });

    if (!updatedTask) {
      return handleError(res, 401, "Failed to update Task Status");
    }

    return handleSuccess(
      res,
      200,
      `Successfully Update task Status to ${status}`,
      updatedTask
    );
  } catch (error) {
    handleError(res, 500, "Failed to update task Status");
  }
};

const changeReviewer = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { reviewer } = req.body;

    const zodCheck = zodTaskReviewerSchema.safeParse({
      id: taskId,
      reviewer: reviewer,
    });

    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      reviewer: reviewer,
    });

    if (!updatedTask) {
      return handleError(res, 401, "Failed to udpate Reviewer");
    }

    handleSuccess(res, 201, "Succesfullt udpate the Reviewer", updatedTask);
  } catch (error) {
    handleError(res, 500, "Failed to change Reviewer");
  }
};

const changeAssignedTo = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const { taskId } = req.query;

    const zodCheck = zodTaskAssigneToSchema.safeParse({
      id: taskId,
      assignedTo,
    });

    if (!zodCheck.success) {
      return handleError(
        res,
        401,
        zodCheck.error.message ?? "Failed to Change Assigner for task"
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      assignedTo: assignedTo,
    });

    if (!updatedTask) {
      return handleError(res, 401, "Failed to Change Assigner for task.");
    }

    handleSuccess(
      res,
      200,
      "Successfully update the Assigner for task.",
      updatedTask
    );
  } catch (error) {
    handleError(res, 500, "Failed to Change Assigner");
  }
};

const createCommentTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.body;
    const { taskId } = req.query;

    const zodCheck = zodCreateCommentSchema.safeParse({
      id: taskId,
      content: content,
    });

    if (!zodCheck.success) {
      return handleError(res, 401, zodCheck.error.message);
    }

    const comment = await createComment({
      refId: taskId,
      refType: "Task",
      content: content,
      commentedBy: userId,
    });
    if (comment.error) {
      return handleError(res, comment.statusCode, comment.message);
    }

    if (comment.success) {
      return handleSuccess(
        res,
        comment.statusCode,
        comment.message,
        comment.data
      );
    }
  } catch (error) {
    handleError(res, 500, "Faield to create Comment");
  }
};

const editCommentTask = async (req, res) => {
  try {
    const { content } = req.params;
    const { commentId } = req.query;
    const userId = req.userId;

    const updatedComment = await editComment({
      commentId: commentId,
      userId,
      content,
    });

    if (updatedComment.error) {
      return handleError(
        res,
        updatedComment.statusCode,
        updatedComment.message
      );
    }

    if (updatedComment.success) {
      return handleSuccess(
        res,
        updatedComment.statusCode,
        updatedComment.message,
        updatedComment.data
      );
    }
  } catch (error) {
    handleError(res, 500, "Failed to update comment");
  }
};

const deleteCommentTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.query;
    const comment = await deleteComment({ commentId, userId });

    if (comment.error) {
      return handleError(res, comment.statusCode, comment.message);
    }

    if (comment.success) {
      return handleSuccess(res, comment.statusCode, comment.message);
    }
  } catch (error) {
    handleError(res, 500, "Failed to delete the comment");
  }
};

export {
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
};
