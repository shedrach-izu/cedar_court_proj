import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment",
        required: true,
    },
    comment: {
        type: String,
        default: "",
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
        minLength: 1,
        maxLength: 5
    }
}, { timestamps: true });

reviewSchema.index({ user: 1, apartment: 1 }, { unique: true });  // disallow duplicate reviews from the same user for the same apartment

const Review = mongoose.model("Review", reviewSchema);

export default Review;