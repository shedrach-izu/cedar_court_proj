import Gallery from "../models/gallery_schema.js";
import GalleryCategory from "../models/gallery_category_schema.js";
import cloudinary from "../config/cloudinary.js";



/**
 * @description Create a gallery
 * @route POST /api/gallery/create
 * @access Private
 */



export const createGallery = async (req, res) => {
    try{
        const { categoryId } = req.body;

        const imageFile = req.file;

        if(!categoryId || !imageFile){
            return res.status(400).json({ message: "all fields required" })
        }

        const existingCategory = await GalleryCategory.findById(categoryId);

        if(!existingCategory){
            return res.status(401).json({ message: "category not found" })
        }

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "cedar/gallery"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        
            uploadStream.end(imageFile.buffer);
        });

        const gallery = await Gallery.create({
            category: categoryId,
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        })

        return res.status(201).json({
            message: "Gallery image created successfully",
            gallery
        });
    }catch(error){
        console.log("Error creating gallery:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all gallery
 * @route GET /api/gallery/galleries
 * @access Public
 */



export const getAllGalleries = async (req, res) => {
    try{
        const galleries = await Gallery.find();

        if(!galleries || galleries.length === 0){
            return res.status(404).json({ message: "galleries not found" })
        }

        res.status(200).json(galleries)
    }catch(error){
        console.log("Error getting all galleries:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all galleries by category
 * @route GET /api/gallery/category/:id
 * @access Public
 */



export const getAllGalleriesByCategory = async (req, res) => {
    try{
        const { categoryId } = req.params;

        if(!categoryId){
            return res.status(400).json({ message: "category ID required" })
        }

        const existingCategory = await GalleryCategory.findById(categoryId);

        if(!existingCategory){
            return res.status(404).json({ message: "category not found" })
        }

        const galleries = await Gallery.find({ category: categoryId });

        if(!galleries || galleries.length === 0){
            return res.status(404).json({ message: "galleries not found" })
        }

        res.status(200).json(galleries);
    }catch(error){
        console.log("Error getting galleries by category:", error);
        res.status(500).json({ message: error.message })
    }
}