import express from "express";
import { getUser, loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
// login , delete , update lastname and firstname  , change password with email base

userRouter.post("/login", loginUser);
userRouter.get("/", getUser);

export { userRouter };
