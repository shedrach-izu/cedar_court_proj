import express from "express";
import { createMenu, getAllMenus, getAllMenuByCategory } from "../controllers/menu_controller.js"
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import multer from "multer";


const menuRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

menuRouter.post("/create", protect, admin, upload.single("image"), createMenu);

menuRouter.get("/all-menu", getAllMenus);

menuRouter.get("/category/:categoryId", getAllMenuByCategory);

export default menuRouter