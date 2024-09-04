import express from "express";
import { userRouter } from "./userRouter.js";
import { projectRouter } from "./projectRouter.js";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
// mainRouter.use("/project", projectRouter);

export default mainRouter;
