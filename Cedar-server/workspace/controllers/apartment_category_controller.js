import ApartmentCategory from "../models/apartment_category_schema.js";


/**
 * @description Create a new apartment category
 * @route POST /api/apartment-category/create
 * @access Private
 */


export const createApartmentCategory = async (req, res) => {
    try {
        const { title } = req.body;

        if(!title){
            return res.status(400).json({ message: "Title required for category" })
        }

        const existingCategory = await ApartmentCategory.findOne({ title: title });

        if(existingCategory){
            return res.status(409).json({ message: "Category with this title already exist" })
        }

        const category = await ApartmentCategory.create({
            title: title.trim()
        })

        res.status(201).json({
            message: "Category created successfully",
            category
        })
    } catch (error) {
        console.log("Error creating apartment category:", error);
        res.status(500).json({ message: error.message })
    }
}



/**
 * @description Get all category
 * @route GET /api/apartment-category/all-categories
 */


export const getAllCategories = async (req, res) => {
    try {
        const categories = await ApartmentCategory.find();

        if(!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories
        });
    } catch (error) {
        console.log("Error retrieving room categories:", error);
        res.status(500).json({ message: error.message });
    }
};