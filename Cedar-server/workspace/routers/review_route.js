import express from "express";
import { protect } from "../middleware/protect.js";
import { createReview } from "../controllers/review_controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", protect, createReview);

export default reviewRouter;