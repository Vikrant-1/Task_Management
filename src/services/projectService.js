import { Project } from "../schema/Project.schema.js";
const getProjectInfoService = async ({ projectId, userId }) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not Exist");
  };

  return project;
};

const deleteProjectService = async ({ projectId, userId }) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project did not exist");

  if (project.createdBy.toString() !== userId) throw new Error("You don't have access to delete this project");
  
  const deleteProject = await Project.findByIdAndDelete(projectId);
  return deleteProject;
}

export { getProjectInfoService ,deleteProjectService};
