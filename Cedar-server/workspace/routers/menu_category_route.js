import express from "express";
import { createMenuCategory, getAllMenuCategories } from "../controllers/menu_category_controller.js";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const menuCategoryRouter = express.Router();

menuCategoryRouter.post("/create", protect, admin, createMenuCategory);

menuCategoryRouter.get("/all-categories", getAllMenuCategories);

export default menuCategoryRouter;