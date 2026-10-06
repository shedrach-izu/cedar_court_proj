import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

// One user can only review a particular booking once
reviewSchema.index(
    { user: 1, booking: 1 },
    {
        unique: true,
        partialFilterExpression: {
            booking: { $exists: true },
        },
    }
);

// One user can review a particular order only once
reviewSchema.index(
    { user: 1, order: 1 },
    {
        unique: true,
        partialFilterExpression: {
            order: { $exists: true },
        },
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;



// import mongoose from "mongoose";


// const reviewSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     apartment: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Apartment",
//         required: true,
//     },
//     comment: {
//         type: String,
//         default: "",
//         trim: true
//     },
//     rating: {
//         type: Number,
//         default: 0,
//         minLength: 1,
//         maxLength: 5
//     }
// }, { timestamps: true });

// reviewSchema.index({ user: 1, apartment: 1 }, { unique: true });  // disallow duplicate reviews from the same user for the same apartment

// const Review = mongoose.model("Review", reviewSchema);

// export default Review;