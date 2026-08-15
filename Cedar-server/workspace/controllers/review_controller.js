import Review from "../models/review_schema.js";
import Apartment from "../models/apartment_schema.js";



/**
 * @description Create a new review for an apartment
 * @route POST /api/review/create
 * @access Private
 */



export const createReview = async (req, res) => {
    try {
        const userId = req.user._id;

        if(!userId){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { apartmentId, comment, rating } = req.body;

        if(!apartmentId || !comment || !rating){
            return res.status(400).json({ message: "Apartment ID, comment and rating are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const apartment = await Apartment.findById(apartmentId);

        if(!apartment){
            return res.status(404).json({ message: "Apartment not found" });
        }

        const existingReview = await Review.findOne({ user: userId, apartment: apartmentId });

        if(existingReview){
            return res.status(409).json({ message: "You have already reviewed this apartment" });
        }

        const review = await Review.create({
            user: userId,
            apartment: apartmentId,
            comment: comment.trim(),
            rating
        });

        res.status(201).json({
            message: "review created successfully",
            review: review
        })
    } catch (error) {
        console.log("Error creating review:", error);
        res.status(500).json({ message: error.message })
    }
}
