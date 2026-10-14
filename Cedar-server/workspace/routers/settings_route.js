import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settings_controller.js";
import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const settingsRouter = express.Router();

// Fetch settings (Footer, booking pages, etc.)
settingsRouter.get("/", getSettings);

// Create the initial settings or update existing settings.
// Admin only.
settingsRouter.put("/", protect, admin, updateSettings);

export default settingsRouter;
