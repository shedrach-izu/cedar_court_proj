import express from "express";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import {
    createApartment,
    getAllApartments,
    getApartmentBySlug,
    getApartmentsByCategoryId,
    getFeaturedApartments,
    updateApartment,
    deleteApartment
} from "../controllers/apartment_controller.js";
// import { createApartment, getAllApartments, getApartmentBySlug, getApartmentsByCategoryId, getFeaturedApartments } from "../controllers/apartment_controller.js";
import multer from "multer";

const apartmentRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    }
})

apartmentRouter.get("/all-apartments", getAllApartments);

apartmentRouter.get("/featured", getFeaturedApartments);

apartmentRouter.get("/category/:id", getApartmentsByCategoryId);

apartmentRouter.get("/:slug", getApartmentBySlug);

apartmentRouter.patch(
    "/:id",
    protect,
    admin,
    upload.array("images", 10),
    updateApartment
);

apartmentRouter.delete(
    "/:id",
    protect,
    admin,
    deleteApartment
);

export default apartmentRouter;