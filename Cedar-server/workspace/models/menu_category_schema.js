import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

export default MenuCategory;