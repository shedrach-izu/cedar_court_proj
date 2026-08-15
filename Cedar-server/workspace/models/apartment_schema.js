import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    gallery: [
        {
            url: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            alt: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    ],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    view: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "available",
        enum: ["available", "booked", "maintenance"]
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ApartmentCategory",
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: true
    },
    amenities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ApartmentAmenity"
        }
    ]
}, { timestamps: true });

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;