import GalleryCategory from "../models/gallery_category_schema.js";



/**
 * @description Create a category for gallery
 * @route POST /api/gallery-category/create
 * @access Private
 */




export const createGalleryCategory = async (req, res) => {
    try {
        const { title } = req.body;

        if(!title){
            return res.status(400).json({ message: "title required" })
        }

        const existingCategory = await GalleryCategory.findOne({ title });

        if(existingCategory){
            return res.status(409).json({ message: "category with this title already exists" })
        }

        const category = await GalleryCategory.create({
            title: title.trim()
        })

        res.status(201).json({
            message: "category created successfully",
            category: category
        })
    } catch (error) {
        console.log("Error creating gallery category:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all gallery categories
 * @route GET /api/gallery-category/all-categories
 * @access Public
 */



export const getAllGalleryCategories = async (req, res) => {
    try {
        const categories = await GalleryCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error getting all gallery categories:", error);
        res.status(500).json({ message: error.message });
    }
};