import zod from "zod";
const projectName = zod.string().min(3).max(50);
const projectDescription = zod.string().max(500);
const projectCreatedBy = zod.string();
const projectMembers = zod.array();

export const zodCreateProjectValidation = zod.object({
  name: projectName,
  description: projectDescription.optional(),
  createdBy: projectCreatedBy,
  members: projectMembers.optional(),
});
