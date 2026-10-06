import express from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getOrderByReference
} from "../controllers/order_controller.js";

import { protect } from "../middleware/protect.js";

const orderRouter = express.Router();


// =====================================
// ORDER ROUTES
// =====================================

// Create a new order
orderRouter.post("/create", protect, createOrder);

// Get logged-in user's orders
orderRouter.get("/my-orders", protect, getMyOrders);

// Get one order
orderRouter.get("/:id", protect, getOrderById);

// Cancel an order
orderRouter.patch("/:id/cancel", protect, cancelOrder);

orderRouter.get(
    "/reference/:reference",
    protect,
    getOrderByReference
);


export default orderRouter;