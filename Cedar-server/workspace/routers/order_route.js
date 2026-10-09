// import express from "express";

// import {
//     createOrder,
//     getMyOrders,
//     getOrderById,
//     cancelOrder,
//     getOrderByReference
// } from "../controllers/order_controller.js";

// import { protect } from "../middleware/protect.js";

// const orderRouter = express.Router();


// // =====================================
// // ORDER ROUTES
// // =====================================

// // Create a new order
// orderRouter.post("/create", protect, createOrder);

// // Get logged-in user's orders
// orderRouter.get("/my-orders", protect, getMyOrders);

// // Get one order
// orderRouter.get("/:id", protect, getOrderById);

// // Cancel an order
// orderRouter.patch("/:id/cancel", protect, cancelOrder);

// orderRouter.get(
//     "/reference/:reference",
//     protect,
//     getOrderByReference
// );


// export default orderRouter;














import express from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getOrderByReference,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../controllers/order_controller.js";

import { protect } from "../middleware/protect.js";
import { admin } from "../middleware/admin.js";

const orderRouter = express.Router();


// =====================================
// CUSTOMER ROUTES
// =====================================

orderRouter.post(
    "/create",
    protect,
    createOrder
);

orderRouter.get(
    "/my-orders",
    protect,
    getMyOrders
);

orderRouter.get(
    "/reference/:reference",
    protect,
    getOrderByReference
);

orderRouter.patch(
    "/:id/cancel",
    protect,
    cancelOrder
);


// =====================================
// ADMIN ROUTES
// =====================================

orderRouter.get(
    "/all-orders",
    protect,
    admin,
    getAllOrders
);

orderRouter.patch(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);

orderRouter.delete(
    "/:id",
    protect,
    admin,
    deleteOrder
);


// =====================================
// CUSTOMER - SINGLE ORDER
// =====================================

orderRouter.get(
    "/:id",
    protect,
    getOrderById
);


export default orderRouter;