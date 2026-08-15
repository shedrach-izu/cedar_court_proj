import express from "express";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";
import { createApartmentAmenity, getAllAmenities } from "../controllers/apartment_amenity_controller.js";


const apartmentAmenityRouter = express.Router();

apartmentAmenityRouter.post("/create", protect, admin, createApartmentAmenity);
apartmentAmenityRouter.get("/all-amenities", getAllAmenities);

export default apartmentAmenityRouter;