import { Project } from "../schema/Project.schema";
import { handleError } from "../utils/responseHandler";

export const projectMiddleware = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return handleError(res, 404, "Project does not found");
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return handleError(res, 404, "Project does not exist");
    }
    req.project = project;
    next();
  } catch (error) {
    handleError(res, 500, error?.message);
  }
};
