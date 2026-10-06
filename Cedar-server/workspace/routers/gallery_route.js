import express from "express";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import multer from "multer";
import { createGallery, getAllGalleries, getAllGalleriesByCategory } from "../controllers/gallery_controller.js";

const galleryRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

galleryRouter.post("/create", protect, admin, upload.single("image"), createGallery);

galleryRouter.get("/galleries", getAllGalleries);

galleryRouter.get("/category/:id", getAllGalleriesByCategory);

export default galleryRouter