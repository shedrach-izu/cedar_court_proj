import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user_controller.js";

console.log("User router loaded");


const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;