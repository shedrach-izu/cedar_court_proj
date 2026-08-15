import express from "express";
import { createGalleryCategory, getAllGalleryCategories } from "../controllers/gallery_category_controller.js"
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";


const galleryCategoryRouter = express.Router();

galleryCategoryRouter.post("/create", protect, admin, createGalleryCategory);

galleryCategoryRouter.get("/all-categories", getAllGalleryCategories);

export default galleryCategoryRouter;