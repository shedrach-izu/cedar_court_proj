import mongoose from "mongoose";

const apartmentCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true });

const ApartmentCategory = mongoose.model("ApartmentCategory", apartmentCategorySchema);

export default ApartmentCategory;