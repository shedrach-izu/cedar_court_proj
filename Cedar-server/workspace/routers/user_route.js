import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../controllers/user_controller.js";

import { protect } from "../middleware/protect.js";

console.log("User router loaded");


const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/me", protect, getCurrentUser);

export default userRouter;