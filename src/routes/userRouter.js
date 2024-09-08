import express from "express";
import { deleteUser, getUser, loginUser, registerUser, updatePassword, updateUser } from "../controller/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authMiddleware,  getUser);
userRouter.put("/", updateUser);
userRouter.put("/reset-password", updatePassword);
userRouter.delete("/", deleteUser);

export { userRouter };
