import mongoose from "mongoose";

function generateOrderId() {
    let id = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (let i = 0; i < 8; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }

    return `ORD-${id}`;
}

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderId: {
            type: String,
            default: generateOrderId,
            unique: true
        },

        // =========================
        // ORDER ITEMS
        // =========================

        items: [
            {
                menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu",
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],

        // =========================
        // RESERVATION DETAILS
        // =========================

        reservationDetails: {
            fullName: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            date: {
                type: Date,
                required: true
            },

            time: {
                type: String,
                required: true
            },

            guests: {
                type: Number,
                required: true
            },

            specialRequest: {
                type: String
            }
        },

        // =========================
        // PAYMENT INFO
        // =========================

        paymentInfo: {
            paymentMethod: {
                type: String,
                default: "paystack",
                required: true
            },

            paymentStatus: {
                type: String,
                enum: [
                    "pending",
                    "paid",
                    "failed",
                    "refunded"
                ],
                default: "pending",
                required: true
            },

            reference: {
                type: String
            },

            transactionId: {
                type: String
            },

            channel: {
                type: String
            },

            paidAt: {
                type: Date
            }
        },

        // =========================
        // ORDER STATUS
        // =========================

        orderStatus: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "preparing",
                "ready",
                "completed",
                "cancelled",
                "refunded"
            ],
            default: "pending",
            required: true
        },

        // =========================
        // PRICE
        // =========================

        subtotal: {
            type: Number,
            required: true
        },

        serviceFee: {
            type: Number,
            required: true,
            default: 0
        },

        totalPrice: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
