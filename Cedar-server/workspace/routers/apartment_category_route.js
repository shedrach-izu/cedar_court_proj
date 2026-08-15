import express from "express";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import { getAllCategories, createApartmentCategory } from "../controllers/apartment_category_controller.js";


const apartmentCategoryRouter = express.Router();

apartmentCategoryRouter.post("/create", protect, admin, createApartmentCategory);
apartmentCategoryRouter.get("/all-categories", getAllCategories);


export default apartmentCategoryRouter;