import { Team } from "../schema/Team.schema";
import {
  createProjectService,
  deleteProjectService,
  getProjectInfoService,
} from "../services/projectService";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { zodCreateProjectValidation } from "../zodSchema/zodProjectValidation";

const createProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { name = "", description = "", teams = [] } = req.params ?? {};
    const zodCheck = zodCreateProjectValidation.safeParse({
      name,
      description,
      createdBy: userId,
      teams,
    });

    if (!zodCheck.success)
      return handleError(
        res,
        401,
        zodCheck.error?.message ?? "Please provide the valid inputs."
      );
    if (teams?.length >= 1) {
      const teamExist = await Team.find({ _id: { $in: teams } }, { _id: 1 });
      if (teamExist.length !== teams.length) return handleError(res, 401, "Some Teams Does not exist");
    }

    const project = await createProjectService({
      name,
      description,
      createdBy: userId,
      teams,
    });

    handleSuccess(res, 200, "Project Created Succesfully!!", project);
  } catch (error) {
    handleError(res, 401, error?.message ?? "Error while creating project");
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
  try {
    const { projectId } = req.query;
    const userId = req.userId;
    await deleteProjectService({ userId, projectId });
    handleSuccess(res, 200, "Project Deleted Successfully!!");
  } catch (error) {
    handleError(res, 401, error?.message ?? "Error while deleting project");
  }
};

export { createProject, getProjectInfo, deleteProject };
