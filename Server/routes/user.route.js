import express from "express"
import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/authenticated.js"

const userRouter = Router()


userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", isAuthenticated, userController.logout);
userRouter.get("/get-profile", isAuthenticated, userController.getProfile);
userRouter.get("/get-other-users", isAuthenticated, userController.getOtherUsers);

userRouter.put("/updateProfile", isAuthenticated, userController.updateProfile)

export default userRouter