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
