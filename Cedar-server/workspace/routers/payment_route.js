import express from "express";

import {
    initializePayment,
    verifyPayment,
    paystackWebhook,
    refundPayment,
    retryPayment
} from "../controllers/payment_controller.js";

import { protect } from "../middleware/protect.js";

const paymentRouter = express.Router();


// Initialize payment
paymentRouter.post(
    "/initialize",
    protect,
    initializePayment
);


// Verify payment
paymentRouter.get(
    "/verify/:reference",
    protect,
    verifyPayment
);


// Retry payment for an order
paymentRouter.post(
    "/retry/:orderId",
    protect,
    retryPayment
);


// Refund an order
paymentRouter.post(
    "/refund/:orderId",
    protect,
    refundPayment
);


// Paystack webhook
// No protect middleware
paymentRouter.post(
    "/webhook",
    paystackWebhook
);


export default paymentRouter;