import express from "express";

import {
    loginAdmin,
    getAdminProfile,
    getAdminStats
} from "../controllers/admin_controller.js";

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


export default adminRouter;