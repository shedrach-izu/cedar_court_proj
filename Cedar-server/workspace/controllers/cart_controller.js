import Cart from "../models/cart_schema.js";
import Menu from "../models/menu_schema.js";

/**
 * @description Add an item to cart
 * @route POST /api/cart/add
 * @access Private
 */
export const addToCart = async (req, res) => {
    try {
        const user = req.user._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { menu, quantity } = req.body;

        if (!menu) {
            return res.status(400).json({
                message: "Menu item is required"
            });
        }

        const menuItem = await Menu.findById(menu);

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        if (!menuItem.isAvailable) {
            return res.status(400).json({
                message: "This menu item is currently unavailable"
            });
        }

        const qty = quantity || 1;

        if (qty < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        let cart = await Cart.findOne({ user });

        // User doesn't have a cart yet
        if (!cart) {
            cart = await Cart.create({
                user,
                items: [
                    {
                        menu: menuItem._id,
                        quantity: qty,
                        price: menuItem.price
                    }
                ]
            });

            return res.status(201).json({
                message: "Item added to cart",
                cart
            });
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(
            item => item.menu.toString() === menuItem._id.toString()
        );

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.items.push({
                menu: menuItem._id,
                quantity: qty,
                price: menuItem.price
            });
        }

        await cart.save();

        await cart.populate("items.menu");

        res.status(200).json({
            message: "Item added to cart",
            cart
        });

    } catch (error) {
        console.log("Error adding item to cart:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


/**
 * @description Get user's cart
 * @route GET /api/cart
 * @access Private
 */
export const getCart = async (req, res) => {
    try {
        const user = req.user._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const cart = await Cart.findOne({ user })
            .populate("items.menu");

        if (!cart) {
            return res.status(200).json({
                cart: {
                    user,
                    items: []
                }
            });
        }

        res.status(200).json({
            cart
        });

    } catch (error) {
        console.log("Error getting cart:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


/**
 * @description Update cart item quantity
 * @route PATCH /api/cart/update/:menuId
 * @access Private
 */
export const updateCartQuantity = async (req, res) => {
    try {
        const user = req.user._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { menuId } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({
                message: "Quantity is required"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({ user }).populate("items.menu");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.menu._id.toString() === menuId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Cart quantity updated",
            cart
        });

    } catch (error) {
        console.log("Error updating cart:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


/**
 * @description Remove item from cart
 * @route DELETE /api/cart/remove/:menuId
 * @access Private
 */
export const removeFromCart = async (req, res) => {
    try {
        const user = req.user._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { menuId } = req.params;

        console.log("MENU ID FROM REQUEST:", menuId);

        const cart = await Cart.findOne({ user }).populate("items.menu");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemExists = cart.items.some(
            item => item.menu._id.toString() === menuId
        );

        if (!itemExists) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.menu._id.toString() !== menuId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            cart
        });

    } catch (error) {
        console.log("Error removing item from cart:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


/**
 * @description Clear user's cart
 * @route DELETE /api/cart/clear
 * @access Private
 */
export const clearCart = async (req, res) => {
    try {
        const user = req.user._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            message: "Cart cleared",
            cart
        });

    } catch (error) {
        console.log("Error clearing cart:", error);

        res.status(500).json({
            message: error.message
        });
    }
};