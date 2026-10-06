import express from "express";

import {
    createBooking,
    getUserBooking,
    getMyBookings,
    cancelBooking,
} from "../controllers/booking_controller.js";

import { protect } from "../middleware/protect.js";

const bookingRouter = express.Router();

bookingRouter.post(
    "/create",
    protect,
    createBooking
);

bookingRouter.get(
    "/my-bookings",
    protect,
    getMyBookings
);

bookingRouter.get(
    "/:id",
    protect,
    getUserBooking
);

bookingRouter.put(
    "/:id/cancel",
    protect,
    cancelBooking
);

export default bookingRouter;