import express from "express";
import { getUser, loginUser, registerUser, updateUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
//  delete  , change password with email base

userRouter.post("/login", loginUser);
userRouter.get("/", getUser);
userRouter.put("/", updateUser);

export { userRouter };
