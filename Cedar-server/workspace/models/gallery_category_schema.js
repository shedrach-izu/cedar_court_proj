import mongoose from "mongoose";

const galleryCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true });

const GalleryCategory = mongoose.model("GalleryCategory", galleryCategorySchema);
export default GalleryCategory;