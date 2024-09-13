import zod from "zod";
import { mongooseZodIdValidation } from "./common";
const taskNameZodValidation = zod
  .string()
  .min(3, "Task name must be at least 3 characters long")
  .max(50, "Task name must be at most 50 characters long")
  .trim();
const taskDescriptionZodValidation = zod
  .string()
  .min(3, "Task description must be at least 3 characters long")
  .max(150, "Task description must be at most 150 characters long")
  .trim();

const taskStatusZodValidation = zod.enum([
  "pending",
  "inprogress",
  "completed",
]);

const assignedToZodValidation = mongooseZodIdValidation("Invalid Assigner Id.");
const reviewerZodValidation = mongooseZodIdValidation("Invalid Reviewer Id.");
const projectIdZodValidation = mongooseZodIdValidation("Invalid Project Id.");
const taskIdZodValidation = mongooseZodIdValidation("Invaild Task Id.");

const commentUserZodValidation = mongooseZodIdValidation("Invalid User Id.");

const commentMessageZodValidation = zod
  .string()
  .max(350, "Message must be at most 350 characters long.")
  .trim();

const commentDateZodeValidation = zod.date({ message: "InValid Date" });

export const zodCreateTaskSchema = zod.object({
  name: taskNameZodValidation,
  description: taskDescriptionZodValidation,
  projectId: projectIdZodValidation,
  status: taskStatusZodValidation.optional(),
  assignedTo: assignedToZodValidation.optional(),
  reviewer: reviewerZodValidation.optional(),
});


export const zodGetTaskSchema = zod.object({
  id: taskIdZodValidation,
});

export const zodTaskStatusSchema = zod.object({
  id: taskIdZodValidation,
  status:taskStatusZodValidation,
});

export const zodTaskReviewerSchema = zod.object({
  id: taskIdZodValidation ,
  reviewer:zodTaskReviewerSchema,
});

export const zodTaskAssigneToSchema = zod.object({
  id: taskIdZodValidation,
  assignedTo:assignedToZodValidation,
});

export const zodCreateCommentSchema = zod.object({
  id: taskIdZodValidation,
  content:commentMessageZodValidation,
})
