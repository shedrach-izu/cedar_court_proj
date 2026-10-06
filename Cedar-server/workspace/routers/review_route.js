import express from "express";

import {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} from "../controllers/review_controller.js";

import { protect } from "../middleware/protect.js";

const reviewRouter = express.Router();


// CREATE REVIEW
reviewRouter.post("/create", protect, createReview);


// GET ALL REVIEWS
reviewRouter.get("/all", getAllReviews);


// GET SINGLE REVIEW
reviewRouter.get("/:reviewId", getSingleReview);


// UPDATE REVIEW
reviewRouter.put("/:reviewId", protect, updateReview);


// DELETE REVIEW
reviewRouter.delete("/:reviewId", protect, deleteReview);


export default reviewRouter;