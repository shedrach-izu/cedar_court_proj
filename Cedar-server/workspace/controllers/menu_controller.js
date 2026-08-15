import MenuCategory from "../models/menu_category_schema.js";
import Menu from "../models/menu_schema.js";
import cloudinary from "../config/cloudinary.js"



/**
 * @description Create a menu
 * @route POST /api/menu/create
 * @access Private
 */



export const createMenu = async (req, res) => {
    const { title, description, price, category } = req.body;

    const imageUrl = req.file;

    if(!title || !description || !price || !category || !imageUrl){
        return res.status(400).json({ message: "all fields required" })
    }

    const existingCategory = await MenuCategory.findById(category);

    if(!existingCategory){
        return res.status(401).json({ message: "category ID not found" })
    }

    const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "cedar/menu"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file.buffer);
    });

    const menu = await Menu.create({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })

    res.status(201).json({
        message: "menu created successfully",
        menu
    })
}



/**
 * @description Get all menu
 * @route GET /api/menu/all-menu
 * @access Public
 */



export const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate("category");

        if(!menus || menus.length === 0){
            return res.status(404).json({ message: "menus not found" })
        }

        res.status(200).json(menus)
    } catch (error) {
        console.log("Error getting all menus:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all menu by category
 * @route GET /api/menu/category/:categoryId
 * @access Public
 */



export const getAllMenuByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const existingCategory = await MenuCategory.findById(categoryId);

        if(!existingCategory){
            return res.status(404).json({ message: "category not found" })
        }

        const menus = await Menu.find({ category: categoryId }).populate("category");

        if(!menus || menus.length === 0){
            return res.status(404).json({ message: "menus not found" })
        }

        res.status(200).json(menus)
    } catch (error) {
        console.log("Error getting all menus by category:", error);
        res.status(500).json({ message: error.message })
    }
}