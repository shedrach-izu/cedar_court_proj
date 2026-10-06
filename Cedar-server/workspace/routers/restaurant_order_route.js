import express from "express";

import { createRestaurantOrder } from "../controllers/restaurant_order_controller.js";
import { protect } from "../middleware/protect.js";

const restaurantRouter = express.Router();

restaurantRouter.post("create", protect, createRestaurantOrder);

export default restaurantRouter;