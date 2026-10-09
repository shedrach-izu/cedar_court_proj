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

    // const menu = await Menu.create({
    //     title: title.trim(),
    //     description: description.trim(),
    //     price: Number(price),
    //     category,
    //     image: {
    //         url: result.secure_url,
    //         publicId: result.public_id
    //     }
    // })


    const menu = await Menu.create({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    });

    const populatedMenu = await Menu.findById(menu._id).populate("category");


    // res.status(201).json({
    //     message: "menu created successfully",
    //     menu
    // })

    res.status(201).json({
        message: "menu created successfully",
        menu: populatedMenu
    })
}




/**
 * @description Update a menu item
 * @route PATCH /api/menu/:id
 * @access Private/Admin
 */
export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, isAvailable } = req.body;

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        // Validate category if a new category was provided
        if (category && category !== menu.category.toString()) {
            const existingCategory = await MenuCategory.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }

            menu.category = category;
        }

        // Update only fields that were provided
        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }

            menu.title = title.trim();
        }

        if (description !== undefined) {
            if (!description.trim()) {
                return res.status(400).json({
                    message: "Description cannot be empty"
                });
            }

            menu.description = description.trim();
        }

        if (price !== undefined) {
            if (Number(price) <= 0) {
                return res.status(400).json({
                    message: "Price must be greater than 0"
                });
            }

            menu.price = Number(price);
        }

        if (isAvailable !== undefined) {
            menu.isAvailable =
                isAvailable === true ||
                isAvailable === "true";
        }

        // Optional image replacement
        if (req.file) {
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

            menu.image = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: menu.image?.alt || menu.title
            };
        }

        await menu.save();

        const updatedMenu = await Menu.findById(id)
            .populate("category");

        return res.status(200).json({
            message: "Menu item updated successfully",
            menu: updatedMenu
        });

    } catch (error) {
        console.log("Error updating menu:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



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



/**
 * @description Toggle menu availability
 * @route PATCH /api/menu/:id/availability
 * @access Private/Admin
 */
export const toggleMenuAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        menu.isAvailable = !menu.isAvailable;

        await menu.save();

        const updatedMenu = await Menu.findById(id).populate("category");

        return res.status(200).json({
            message: "Menu availability updated successfully",
            menu: updatedMenu
        });

    } catch (error) {
        console.log("Error toggling menu availability:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



/**
 * @description Delete a menu item
 * @route DELETE /api/menu/:id
 * @access Private/Admin
 */
export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        await Menu.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Menu item deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting menu:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};