import mongoose from "mongoose";

import Review from "../models/review_schema.js";
import Booking from "../models/booking_schema.js";
import Order from "../models/order_schema.js";


// =====================================================
// CREATE REVIEW
// =====================================================

export const createReview = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            bookingId,
            orderId,
            rating,
            comment,
        } = req.body;


        // A review must belong to either a booking OR an order
        if (!bookingId && !orderId) {
            return res.status(400).json({
                message: "A booking or order is required to create a review.",
            });
        }


        // A review cannot belong to both
        if (bookingId && orderId) {
            return res.status(400).json({
                message: "A review can only be linked to a booking or an order.",
            });
        }


        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5.",
            });
        }


        // Validate comment
        if (!comment || comment.trim().length < 3) {
            return res.status(400).json({
                message: "Comment must be at least 3 characters long.",
            });
        }


        // =====================================================
        // APARTMENT BOOKING REVIEW
        // =====================================================

        if (bookingId) {

            if (!mongoose.Types.ObjectId.isValid(bookingId)) {
                return res.status(400).json({
                    message: "Invalid booking ID.",
                });
            }


            const booking = await Booking.findById(bookingId);

            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found.",
                });
            }


            // Make sure this booking belongs to the logged-in user
            if (booking.user.toString() !== userId.toString()) {
                return res.status(403).json({
                    message: "You are not allowed to review this booking.",
                });
            }


            // Prevent duplicate review
            const existingReview = await Review.findOne({
                user: userId,
                booking: bookingId,
            });

            if (existingReview) {
                return res.status(400).json({
                    message: "You have already reviewed this booking.",
                });
            }


            const review = await Review.create({
                user: userId,
                booking: bookingId,
                rating,
                comment,
            });


            return res.status(201).json({
                message: "Review created successfully.",
                review,
            });
        }


        // =====================================================
        // RESTAURANT ORDER REVIEW
        // =====================================================

        if (orderId) {

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({
                    message: "Invalid order ID.",
                });
            }


            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({
                    message: "Order not found.",
                });
            }


            // Make sure this order belongs to the logged-in user
            if (order.user.toString() !== userId.toString()) {
                return res.status(403).json({
                    message: "You are not allowed to review this order.",
                });
            }


            // Prevent duplicate review
            const existingReview = await Review.findOne({
                user: userId,
                order: orderId,
            });

            if (existingReview) {
                return res.status(400).json({
                    message: "You have already reviewed this order.",
                });
            }


            const review = await Review.create({
                user: userId,
                order: orderId,
                rating,
                comment,
            });


            return res.status(201).json({
                message: "Review created successfully.",
                review,
            });
        }

    } catch (error) {
        console.error("Create review error:", error);

        return res.status(500).json({
            message: "Failed to create review.",
            error: error.message,
        });
    }
};


// =====================================================
// GET ALL REVIEWS
// =====================================================

export const getAllReviews = async (req, res) => {
    try {

        const reviews = await Review.find()
            .populate("user", "name email")
            .populate("booking")
            .populate("order")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            message: "Reviews fetched successfully.",
            reviews,
        });

    } catch (error) {
        console.error("Get all reviews error:", error);

        return res.status(500).json({
            message: "Failed to fetch reviews.",
            error: error.message,
        });
    }
};


// =====================================================
// GET SINGLE REVIEW
// =====================================================

export const getSingleReview = async (req, res) => {
    try {

        const { reviewId } = req.params;


        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({
                message: "Invalid review ID.",
            });
        }


        const review = await Review.findById(reviewId)
            .populate("user", "name email")
            .populate("booking")
            .populate("order");


        if (!review) {
            return res.status(404).json({
                message: "Review not found.",
            });
        }


        return res.status(200).json({
            message: "Review fetched successfully.",
            review,
        });

    } catch (error) {
        console.error("Get single review error:", error);

        return res.status(500).json({
            message: "Failed to fetch review.",
            error: error.message,
        });
    }
};


// =====================================================
// UPDATE REVIEW
// =====================================================

export const updateReview = async (req, res) => {
    try {

        const { reviewId } = req.params;
        const userId = req.user._id;

        const {
            rating,
            comment,
        } = req.body;


        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({
                message: "Invalid review ID.",
            });
        }


        const review = await Review.findById(reviewId);


        if (!review) {
            return res.status(404).json({
                message: "Review not found.",
            });
        }


        // Only the person who created the review can update it
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this review.",
            });
        }


        // Update rating if provided
        if (rating !== undefined) {

            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    message: "Rating must be between 1 and 5.",
                });
            }

            review.rating = rating;
        }


        // Update comment if provided
        if (comment !== undefined) {

            if (comment.trim().length < 3) {
                return res.status(400).json({
                    message: "Comment must be at least 3 characters long.",
                });
            }

            review.comment = comment.trim();
        }


        await review.save();


        return res.status(200).json({
            message: "Review updated successfully.",
            review,
        });

    } catch (error) {
        console.error("Update review error:", error);

        return res.status(500).json({
            message: "Failed to update review.",
            error: error.message,
        });
    }
};


// =====================================================
// DELETE REVIEW
// =====================================================

export const deleteReview = async (req, res) => {
    try {

        const { reviewId } = req.params;
        const userId = req.user._id;


        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({
                message: "Invalid review ID.",
            });
        }


        const review = await Review.findById(reviewId);


        if (!review) {
            return res.status(404).json({
                message: "Review not found.",
            });
        }


        // Only the owner can delete the review
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this review.",
            });
        }


        await Review.findByIdAndDelete(reviewId);


        return res.status(200).json({
            message: "Review deleted successfully.",
        });

    } catch (error) {
        console.error("Delete review error:", error);

        return res.status(500).json({
            message: "Failed to delete review.",
            error: error.message,
        });
    }
};