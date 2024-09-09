import { Project } from "../schema/Project.schema.js";
const getProjectInfoService = async ({ projectId, userId }) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not Exist");
  };

  return project;
};

export { getProjectInfoService };
