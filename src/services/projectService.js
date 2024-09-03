import { Project } from "../schema/Project.schema";

const createProjectService = async ({
  name,
  description,
  createdBy,
  members = [],
}) => {
  const project = await Project.create({
    name,
    description,
    createdBy,
    members,
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
    project.createdBy._id === userId ||
    project.members.find((val) => val.user._id === userId);

  if (check) return project;

  throw new Error("You dont Have Access of this project");
};

export { createProjectService, getProjectInfoService };
