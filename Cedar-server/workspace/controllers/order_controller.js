import Order from "../models/order_schema.js";
import Menu from "../models/menu_schema.js";

// =====================================
// CREATE ORDER
// =====================================

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            items,
            reservationDetails,
            subtotal,
            serviceFee,
            totalPrice
        } = req.body;

        // ==============================
        // VALIDATION
        // ==============================

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item"
            });
        }

        if (!reservationDetails) {
            return res.status(400).json({
                success: false,
                message: "Reservation details are required"
            });
        }

        const {
            fullName,
            email,
            phone,
            date,
            time,
            guests,
            specialRequest
        } = reservationDetails;

        if (
            !fullName ||
            !email ||
            !phone ||
            !date ||
            !time ||
            !guests
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required reservation details"
            });
        }

        // ==============================
        // VERIFY MENU ITEMS
        // ==============================

        const orderItems = [];

        for (const item of items) {
            const menu = await Menu.findById(item.menu);

            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: `Menu item not found: ${item.menu}`
                });
            }

            if (!item.quantity || item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be greater than 0"
                });
            }

            orderItems.push({
                menu: menu._id,
                price: menu.price,
                quantity: item.quantity
            });
        }

        // ==============================
        // CREATE ORDER
        // ==============================

        const order = await Order.create({
            user: userId,

            items: orderItems,

            reservationDetails: {
                fullName,
                email,
                phone,
                date,
                time,
                guests,
                specialRequest
            },

            paymentInfo: {
                paymentMethod: "paystack",
                paymentStatus: "pending"
            },

            orderStatus: "pending",

            subtotal,
            serviceFee: serviceFee || 0,
            totalPrice
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};


// =====================================
// GET MY ORDERS
// =====================================

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        })
            .populate("items.menu")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Get my orders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// =====================================
// GET SINGLE ORDER
// =====================================

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id
        })
            .populate("items.menu");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get order",
            error: error.message
        });
    }
};


// =====================================
// CANCEL ORDER
// =====================================

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (
            order.orderStatus === "completed" ||
            order.orderStatus === "cancelled"
        ) {
            return res.status(400).json({
                success: false,
                message: `Order cannot be cancelled because it is already ${order.orderStatus}`
            });
        }

        order.orderStatus = "cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        console.error("Cancel order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to cancel order",
            error: error.message
        });
    }
};



export const getOrderByReference = async (req, res) => {
    try {
        const { reference } = req.params;

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: "Order reference is required"
            });
        }

        const order = await Order.findOne({
            "paymentInfo.reference": reference,
            user: req.user._id
        })
        .populate("items.menu");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get order by reference error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
};