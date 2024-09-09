import mongoose from "mongoose";
import { Team } from "../schema/Team.schema";
import { getProjectInfoService } from "../services/projectService";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { zodCreateProjectValidation } from "../zodSchema/zodProjectValidation";
import { Project } from "../schema/Project.schema";

const createProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { name = "", description = "", teams = [] } = req.body ?? {};
    // Zod validation
    const zodCheck = zodCreateProjectValidation.safeParse({
      name,
      description,
      createdBy: userId,
      teams,
    });

    if (!zodCheck.success)
      return handleError(
        res,
        400, // Changed to 400 Bad Request
        zodCheck.error?.message ?? "Please provide valid inputs."
      );
    // Check if the provided teams exist
    if (teams?.length >= 1) {
      const teamExist = await Team.find({ _id: { $in: teams } }, { _id: 1 });
      if (teamExist.length !== teams.length)
        return handleError(res, 404, "Some teams do not exist.");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    // Create new project
    const newProject = new Project({
      name,
      description,
      teams,
      createdBy: userId,
    });
    await newProject.save({ session });

    // Update teams with project ids
    await Team.updateMany(
      { _id: { $in: teams } },
      { $addToSet: { projects: newProject._id } },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    handleSuccess(res, 200, "Project created successfully!", newProject);
  } catch (error) {
    // Rollback transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    handleError(res, 500, error?.message ?? "Error while creating project");
  }
};

const getProjectInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.query ?? {};

    const project = await getProjectInfoService({ projectId, userId });

    handleSuccess(res, 200, "Project fetched Successfully!!", project);
  } catch (error) {
    handleError(res, 401, "Error while fetching project");
  }
};

const deleteProject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { projectId } = req.params;
    const project = req.project ?? {};
    // delete project from all teams
    if (project?.teams?.length > 0) {
      await Team.updateMany(
        {
          projects: projectId,
        },
        {
          $pull: { projects: projectId },
        },
        { session }
      );
    }
    // delete project
    await Project.findByIdAndDelete(projectId);
    await session.commitTransaction();
    session.endSession();
    handleSuccess(res, 200, "Project Deleted Successfully!!");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    handleError(res, 401, error?.message ?? "Error while deleting project");
  }
};

const updateProjectDetails = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { projectId } = req.params;

    const updatedProject = await Project.updateOne(
      { _id: projectId },
      { name, description }
    );

    if (!updateProjectDetails)
      return handleError(res, 401, "Failed to update Project");

    handleSuccess(res, 200, "Project updatedSuccessfully", updatedProject);
  } catch (error) {
    handleError(res, 500, error?.message ?? "Failed to update project details");
  }
};

const updateProjectTeams = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { addedTeams, removedTeams } = req.body;
    // add teams
    const updatedProject = await Project.updateOne(
      { _id: projectId },
      {
        $addToSet: { teams: addedTeams },
        $pull: { teams: removedTeams },
      }
    );
    // remove project from removed Teams
    await Team.updateMany(
      { _id: { $in: removedTeams } },
      { $pull: { projects: projectId } }
    );
    // add project in new teams
    await Team.updateMany(
      { _id: { $in: addedTeams } },
      { $addToSet: { projects: projectId } }
    );

    handleSuccess(
      res,
      200,
      "Project Teams Updated Succesfully!!",
      updatedProject
    );
  } catch (error) {
    handleError(res, 500, "Failed to updated project teams");
  }
};

export {
  createProject,
  getProjectInfo,
  deleteProject,
  updateProjectDetails,
  updateProjectTeams,
};
