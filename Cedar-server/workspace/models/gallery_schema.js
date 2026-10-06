import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema({
    image: {
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String
        },
        publicId: {
            type: String
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galleryCategory",
        required: true
    }
}, { timestamps: true });

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery