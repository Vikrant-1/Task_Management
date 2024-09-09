import { Project } from "../schema/Project.schema.js";

const createProjectService = async ({
  name,
  description,
  createdBy,
  teams = [],
}) => {
  const project = await Project.create({
    name,
    description,
    createdBy,
    teams,
  });
  if (!project) throw new Error("Error While creating project");
  return project;
};

const getProjectInfoService = async ({ projectId, userId }) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not Exist");
  }
  const check =
    project.createdBy.toString() === userId ||
    project.members.find((val) => val.user._id === userId);

  if (check) return project;

  throw new Error("You dont Have Access of this project");
};

const deleteProjectService = async ({ projectId, userId }) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project did not exist");

  if (project.createdBy.toString() !== userId) throw new Error("You don't have access to delete this project");
  
  const deleteProject = await Project.findByIdAndDelete(projectId);
  return deleteProject;
}

export { createProjectService, getProjectInfoService ,deleteProjectService};
