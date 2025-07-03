import express from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/user", userController.getUsers);
userRouter.post("/user", userController.checkUser);
userRouter.post("/user/otp", userController.generateOTP);
userRouter.put("/user", userController.updatePassword);
userRouter.post("/user/register", userController.registerUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;
