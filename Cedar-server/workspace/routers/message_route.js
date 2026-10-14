import express from "express";

import {
  createMessage,
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  replyToMessage,
} from "../controllers/message_controller.js";

import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const messageRouter = express.Router();


/* =========================================================
   PUBLIC
========================================================= */

// Contact form
messageRouter.post(
  "/create",
  createMessage
);


/* =========================================================
   ADMIN
========================================================= */

// Get all messages
messageRouter.get(
  "/all",
  protect,
  admin,
  getAllMessages
);


// Get one message
messageRouter.get(
  "/:id",
  protect,
  admin,
  getMessageById
);


// Mark as read
messageRouter.patch(
  "/:id/read",
  protect,
  admin,
  markMessageAsRead
);


// Mark as unread
messageRouter.patch(
  "/:id/unread",
  protect,
  admin,
  markMessageAsUnread
);


// Delete message
messageRouter.delete(
  "/:id",
  protect,
  admin,
  deleteMessage
);


// Reply to message
messageRouter.post(
  "/:id/reply",
  protect,
  admin,
  replyToMessage
);


export default messageRouter;