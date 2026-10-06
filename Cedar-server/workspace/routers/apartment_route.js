import express from "express";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import { createApartment, getAllApartments, getApartmentBySlug, getApartmentsByCategoryId, getFeaturedApartments } from "../controllers/apartment_controller.js";
import multer from "multer";

const apartmentRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    }
})

apartmentRouter.post("/create", protect, admin, upload.array("images", 10), createApartment);

apartmentRouter.get("/all-apartments", getAllApartments)

apartmentRouter.get("/featured", getFeaturedApartments);


apartmentRouter.get("/:slug", getApartmentBySlug)

apartmentRouter.get("/category/:id", getApartmentsByCategoryId)

export default apartmentRouter;