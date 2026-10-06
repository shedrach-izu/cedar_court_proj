import express from "express";
import { protect } from "../middleware/protect.js";
import {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
} from "../controllers/cart_controller.js";

const cartRouter = express.Router();


// Add item to cart
cartRouter.post("/add", protect, addToCart);

// Get user's cart
cartRouter.get("/", protect, getCart);

// Update item quantity
cartRouter.patch(
    "/update/:menuId",
    protect,
    updateCartQuantity
);

// Remove item from cart
cartRouter.delete(
    "/remove/:menuId",
    protect,
    removeFromCart
);

// Clear entire cart
cartRouter.delete(
    "/clear",
    protect,
    clearCart
);


export default cartRouter;