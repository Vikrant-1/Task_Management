import mongoose from "mongoose";
import zod from "zod";
const mongooseZodIdValidation = (message) =>
  zod.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: message || "Invalid Id",
  });

export { mongooseZodIdValidation };
