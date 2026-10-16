
import express from "express";
import {
  subscribeNewsletter,
  getNewsletterSubscribers,
  updateNewsletterStatus,
  deleteNewsletterSubscriber,
  sendNewsletter,
  unsubscribeFromNewsletter,
} from "../controllers/newsletter_controller.js";

import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const newsletterRouter = express.Router();

// Public endpoints
newsletterRouter.post("/subscribe", subscribeNewsletter);
newsletterRouter.get("/unsubscribe/:token", unsubscribeFromNewsletter);

// Admin-only endpoints
newsletterRouter.get("/all", protect, admin, getNewsletterSubscribers);
newsletterRouter.patch("/:id/status", protect, admin, updateNewsletterStatus);
newsletterRouter.delete("/:id", protect, admin, deleteNewsletterSubscriber);
newsletterRouter.post("/send", protect, admin, sendNewsletter);

export default newsletterRouter;
