import express from "express";

import {
    loginAdmin,
    getAdminProfile,
    getAdminStats
} from "../controllers/admin_controller.js";

import {
    getAllBookings
} from "../controllers/booking_controller.js";

import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const adminRouter = express.Router();


// ========================================
// ADMIN LOGIN
// ========================================

adminRouter.post(
    "/login",
    loginAdmin
);


// ========================================
// ADMIN PROFILE
// ========================================

adminRouter.get(
    "/profile",
    protect,
    admin,
    getAdminProfile
);


// ========================================
// ADMIN DASHBOARD STATISTICS
// ========================================

adminRouter.get(
    "/statistics",
    protect,
    admin,
    getAdminStats
);

// ========================================
// GET ALL BOOKINGS
// ========================================

adminRouter.get(
    "/bookings",
    protect,
    admin,
    getAllBookings
);

export default adminRouter;