import MenuCategory from "../models/menu_category_schema.js";



/**
 * @description Create a category for menu
 * @route POST /api/menu-category/create
 * @access Private
 */



export const createMenuCategory = async (req, res) => {
    try {
        const { title } = req.body;

        if(!title){
            return res.status(400).json({ message: "title required" })
        }
        
        const existingCategory = await MenuCategory.findOne({ title });

        if(existingCategory){
            return res.status(409).json({ message: "category with this title already exist" })
        }

        const category = await MenuCategory.create({
            title
        })

        res.status(201).json({
            message: "menu category created successfully",
            category
        })
    } catch (error) {
        console.log("Error creating category for menu:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all menu categories
 * @route GET /api/menu-category/all-categories
 * @access Public
 */



export const getAllMenuCategories = async (req, res) => {
    try {
        const categories = await MenuCategory.find();

        if(!categories || categories.length === 0){
            return res.status(404).json({ message: "categories not found" })
        }

        res.status(200).json(categories)
    } catch (error) {
        console.log("Error getting all menu categories:", error);
        res.status(500).json({ message: error.message })
    }
}