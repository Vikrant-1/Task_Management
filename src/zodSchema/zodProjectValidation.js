import zod from "zod";
const projectName = zod.string().min(3).max(50);
const projectDescription = zod.string().max(500);
const projectCreatedBy = zod.string();
const projectTeams = zod.array();

export const zodCreateProjectValidation = zod.object({
  name: projectName,
  description: projectDescription.optional(),
  createdBy: projectCreatedBy,
  teams: projectTeams.optional(),
  toDate: zod.number().optional(),
  fromDate: zod.number().optional(),
});
