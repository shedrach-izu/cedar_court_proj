import axios from "axios";
import Order from "../models/order_schema.js";
import Booking from "../models/booking_schema.js";
import crypto from "crypto";

// =====================================
// INITIALIZE PAYMENT
// =====================================

// export const initializePayment = async (req, res) => {
//     try {
//         const { orderId } = req.body;

//         if (!orderId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Order ID is required"
//             });
//         }

//         // Find order belonging to logged-in user
//         const order = await Order.findOne({
//             _id: orderId,
//             user: req.user._id
//         });

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order not found"
//             });
//         }

//         // Don't initialize payment for already-paid order
//         if (order.paymentInfo.paymentStatus === "paid") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Order has already been paid for"
//             });
//         }

//         // ==============================
//         // PAYSTACK
//         // ==============================

//         const response = await axios.post(
//             "https://api.paystack.co/transaction/initialize",
//             {
//                 email: order.reservationDetails.email,

//                 amount: Math.round(order.totalPrice * 100),

//                 reference: order.orderId,

//                 callback_url: `${process.env.FRONTEND_URL}/order-success`,

//                 metadata: {
//                     orderId: order._id.toString(),
//                     orderNumber: order.orderId,
//                     userId: req.user._id.toString()
//                 }
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         if (!response.data.status) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Unable to initialize payment"
//             });
//         }

//         // Save Paystack reference
//         order.paymentInfo.reference =
//             response.data.data.reference;

//         await order.save();

//         return res.status(200).json({
//             success: true,
//             message: "Payment initialized successfully",

//             authorizationUrl:
//                 response.data.data.authorization_url,

//             accessCode:
//                 response.data.data.access_code,

//             reference:
//                 response.data.data.reference
//         });

//     } catch (error) {
//         console.error(
//             "Initialize payment error:",
//             error.response?.data || error.message
//         );

//         return res.status(500).json({
//             success: false,
//             message: "Failed to initialize payment",
//             error: error.response?.data?.message || error.message
//         });
//     }
// };


export const initializePayment = async (req, res) => {
    try {
        const { orderId, bookingId } = req.body;

        // Must provide either orderId OR bookingId
        if (!orderId && !bookingId) {
            return res.status(400).json({
                success: false,
                message: "Order ID or Booking ID is required"
            });
        }

        // =====================================================
        // RESTAURANT ORDER PAYMENT
        // =====================================================

        if (orderId) {
            const order = await Order.findOne({
                _id: orderId,
                user: req.user._id
            });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            if (order.paymentInfo.paymentStatus === "paid") {
                return res.status(400).json({
                    success: false,
                    message: "Order has already been paid for"
                });
            }

            const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                {
                    email: order.reservationDetails.email,

                    amount: Math.round(
                        order.totalPrice * 100
                    ),

                    reference: order.orderId,

                    callback_url:
                        `${process.env.FRONTEND_URL}/order-success`,

                    metadata: {
                        type: "order",
                        orderId: order._id.toString(),
                        orderNumber: order.orderId,
                        userId: req.user._id.toString()
                    }
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );

            if (!response.data.status) {
                return res.status(400).json({
                    success: false,
                    message: "Unable to initialize payment"
                });
            }

            // Save Paystack reference
            order.paymentInfo.reference =
                response.data.data.reference;

            await order.save();

            return res.status(200).json({
                success: true,
                message:
                    "Order payment initialized successfully",

                authorizationUrl:
                    response.data.data.authorization_url,

                accessCode:
                    response.data.data.access_code,

                reference:
                    response.data.data.reference
            });
        }

        // =====================================================
        // APARTMENT BOOKING PAYMENT
        // =====================================================

        if (bookingId) {
            const booking = await Booking.findOne({
                _id: bookingId,
                user: req.user._id
            }).populate("user", "email");

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });
            }

            if (booking.paymentStatus === "paid") {
                return res.status(400).json({
                    success: false,
                    message:
                        "Booking has already been paid for"
                });
            }

            if (!booking.user?.email) {
                return res.status(400).json({
                    success: false,
                    message:
                        "User email is required for payment"
                });
            }

            // Generate a unique booking payment reference
            const paymentReference =
                `BOOK-${booking._id}-${Date.now()}`;

            const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                {
                    email: booking.user.email,

                    amount: Math.round(
                        booking.totalAmount * 100
                    ),

                    reference: paymentReference,

                    callback_url:
                        `${process.env.FRONTEND_URL}/booking-success`,

                    metadata: {
                        type: "booking",
                        bookingId:
                            booking._id.toString(),

                        userId:
                            req.user._id.toString()
                    }
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );

            if (!response.data.status) {
                return res.status(400).json({
                    success: false,
                    message: "Unable to initialize payment"
                });
            }

            // Save Paystack reference to booking
            booking.paymentReference =
                response.data.data.reference;

            await booking.save();

            return res.status(200).json({
                success: true,
                message:
                    "Booking payment initialized successfully",

                authorizationUrl:
                    response.data.data.authorization_url,

                accessCode:
                    response.data.data.access_code,

                reference:
                    response.data.data.reference
            });
        }

    } catch (error) {
        console.error(
            "Initialize payment error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to initialize payment",
            error:
                error.response?.data?.message ||
                error.message
        });
    }
};


// =====================================
// VERIFY PAYMENT
// =====================================

// export const verifyPayment = async (req, res) => {
//     try {
//         const { reference } = req.params;

//         if (!reference) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Payment reference is required"
//             });
//         }

//         // ==============================
//         // VERIFY WITH PAYSTACK
//         // ==============================

//         const response = await axios.get(
//             `https://api.paystack.co/transaction/verify/${reference}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
//                 }
//             }
//         );

//         const payment = response.data.data;

//         if (!payment) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Payment not found"
//             });
//         }

//         // ==============================
//         // FIND ORDER
//         // ==============================

//         const order = await Order.findOne({
//             "paymentInfo.reference": reference
//         });

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Order associated with this payment was not found"
//             });
//         }

//         // Make sure the order belongs to the logged-in user
//         if (order.user.toString() !== req.user._id.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "You are not authorized to access this order"
//             });
//         }

//         // ==============================
//         // PAYMENT SUCCESSFUL
//         // ==============================

//         if (payment.status === "success") {

//             order.paymentInfo.paymentStatus = "paid";

//             order.paymentInfo.transactionId =
//                 payment.id?.toString();

//             order.paymentInfo.channel =
//                 payment.channel;

//             order.paymentInfo.paidAt =
//                 payment.paid_at
//                     ? new Date(payment.paid_at)
//                     : new Date();

//             order.orderStatus = "confirmed";

//             await order.save();

//             return res.status(200).json({
//                 success: true,
//                 message: "Payment verified successfully",
//                 order
//             });
//         }

//         // ==============================
//         // PAYMENT FAILED
//         // ==============================

//         order.paymentInfo.paymentStatus = "failed";

//         await order.save();

//         return res.status(400).json({
//             success: false,
//             message: "Payment was not successful",
//             status: payment.status
//         });

//     } catch (error) {
//         console.error(
//             "Verify payment error:",
//             error.response?.data || error.message
//         );

//         return res.status(500).json({
//             success: false,
//             message: "Failed to verify payment",
//             error: error.response?.data?.message || error.message
//         });
//     }
// };



export const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.params;

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: "Payment reference is required",
            });
        }

        // =====================================
        // 1. VERIFY PAYMENT WITH PAYSTACK
        // =====================================

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        if (
            !response.data.status ||
            !response.data.data
        ) {
            return res.status(400).json({
                success: false,
                message: "Unable to verify payment with Paystack",
            });
        }

        const payment = response.data.data;

        // =====================================
        // 2. FIND RESTAURANT ORDER
        // =====================================

        const order = await Order.findOne({
            "paymentInfo.reference": reference,
        });

        if (order) {
            // Check ownership
            if (
                order.user.toString() !==
                req.user._id.toString()
            ) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to access this order",
                });
            }

            // Check payment status
            if (payment.status !== "success") {
                return res.status(400).json({
                    success: false,
                    message: "Payment was not successful",
                    status: payment.status,
                });
            }

            // Check amount
            const expectedAmount = Math.round(
                order.totalPrice * 100
            );

            if (payment.amount !== expectedAmount) {
                return res.status(400).json({
                    success: false,
                    message: "Payment amount does not match the order total",
                });
            }

            // Update order payment information
            order.paymentInfo.paymentStatus = "paid";
            order.paymentInfo.transactionId =
                payment.id?.toString();
            order.paymentInfo.channel = payment.channel;
            order.paymentInfo.paidAt = payment.paid_at
                ? new Date(payment.paid_at)
                : new Date();

            order.orderStatus = "confirmed";

            await order.save();

            return res.status(200).json({
                success: true,
                type: "order",
                message: "Order payment verified successfully",
                order,
            });
        }

        // =====================================
        // 3. FIND APARTMENT BOOKING
        // =====================================

        const booking = await Booking.findOne({
            paymentReference: reference,
        }).populate("apartment");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message:
                    "Order or booking associated with this payment was not found",
            });
        }

        // =====================================
        // 4. CHECK BOOKING OWNERSHIP
        // =====================================

        if (
            booking.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to access this booking",
            });
        }

        // =====================================
        // 5. CHECK PAYMENT STATUS
        // =====================================

        if (payment.status !== "success") {
            return res.status(400).json({
                success: false,
                message: "Payment was not successful",
                status: payment.status,
            });
        }

        // Do not confirm a booking that was cancelled.
        if (booking.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message:
                    "This booking has been cancelled. Please contact support.",
            });
        }

        // =====================================
        // 6. VERIFY PAYMENT AMOUNT
        // =====================================

        const expectedBookingAmount = Math.round(
            booking.totalAmount * 100
        );

        if (
            !Number.isFinite(expectedBookingAmount) ||
            payment.amount !== expectedBookingAmount
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Payment amount does not match the booking total",
            });
        }

        // =====================================
        // 7. UPDATE APARTMENT BOOKING
        // =====================================

        if (booking.paymentStatus !== "refunded") {
            booking.paymentStatus = "paid";
        }

        if (booking.status === "pending") {
            booking.status = "confirmed";
        }

        await booking.save();

        // =====================================
        // 8. RETURN THE REAL BOOKING
        // =====================================

        return res.status(200).json({
            success: true,
            type: "booking",
            message: "Booking payment verified successfully",
            booking,
        });

    } catch (error) {
        console.error(
            "Verify payment error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to verify payment",
            error:
                error.response?.data?.message ||
                error.message,
        });
    }
};



export const refundPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Must have been paid
        if (order.paymentInfo.paymentStatus !== "paid") {
            return res.status(400).json({
                success: false,
                message: "This order has not been paid for"
            });
        }

        // Must have a Paystack reference
        if (!order.paymentInfo.reference) {
            return res.status(400).json({
                success: false,
                message: "Payment reference not found"
            });
        }

        // Don't refund twice
        if (order.orderStatus === "refunded") {
            return res.status(400).json({
                success: false,
                message: "Order has already been refunded"
            });
        }

        const response = await axios.post(
            "https://api.paystack.co/refund",
            {
                transaction:
                    order.paymentInfo.reference
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                    "Content-Type":
                        "application/json"
                }
            }
        );

        if (!response.data.status) {
            return res.status(400).json({
                success: false,
                message: "Refund request failed"
            });
        }

        order.paymentInfo.paymentStatus = "refunded";
        order.orderStatus = "refunded";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Refund initiated successfully",
            order
        });

    } catch (error) {
        console.error(
            "Refund error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to process refund",
            error:
                error.response?.data?.message ||
                error.message
        });
    }
};



export const retryPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (
            order.paymentInfo.paymentStatus === "paid"
        ) {
            return res.status(400).json({
                success: false,
                message: "This order has already been paid for"
            });
        }

        if (order.orderStatus === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Cancelled orders cannot be paid for"
            });
        }

        // Generate a NEW payment reference
        const reference =
            `${order.orderId}-${Date.now()}`;

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email:
                    order.reservationDetails.email,

                amount:
                    Math.round(order.totalPrice * 100),

                reference,

                metadata: {
                    orderId:
                        order._id.toString(),

                    orderNumber:
                        order.orderId,

                    userId:
                        req.user._id.toString()
                }
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                    "Content-Type":
                        "application/json"
                }
            }
        );

        if (!response.data.status) {
            return res.status(400).json({
                success: false,
                message: "Unable to initialize payment"
            });
        }

        // Save NEW reference
        order.paymentInfo.reference =
            response.data.data.reference;

        order.paymentInfo.paymentStatus =
            "pending";

        await order.save();

        return res.status(200).json({
            success: true,

            authorizationUrl:
                response.data.data.authorization_url,

            accessCode:
                response.data.data.access_code,

            reference:
                response.data.data.reference
        });

    } catch (error) {
        console.error(
            "Retry payment error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to retry payment",
            error:
                error.response?.data?.message ||
                error.message
        });
    }
};




export const paystackWebhook = async (req, res) => {
    try {
        const secret =
            process.env.PAYSTACK_SECRET_KEY;

        const hash = crypto
            .createHmac("sha512", secret)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (hash !== req.headers["x-paystack-signature"]) {
            return res.status(401).json({
                success: false,
                message: "Invalid signature"
            });
        }

        const event = req.body;

        console.log(
            "Paystack webhook:",
            event.event
        );

        // ============================
        // PAYMENT SUCCESS
        // ============================

        if (event.event === "charge.success") {

            const payment =
                event.data;

            const reference =
                payment.reference;

            const order =
                await Order.findOne({
                    "paymentInfo.reference":
                        reference
                });

            if (!order) {
                console.log(
                    "Order not found for reference:",
                    reference
                );

                return res.sendStatus(200);
            }

            // Prevent duplicate webhook processing
            if (
                order.paymentInfo.paymentStatus ===
                "paid"
            ) {
                return res.sendStatus(200);
            }

            // Verify amount
            const expectedAmount =
                Math.round(
                    order.totalPrice * 100
                );

            if (
                payment.amount !==
                expectedAmount
            ) {
                console.error(
                    "Payment amount mismatch"
                );

                return res.sendStatus(400);
            }

            order.paymentInfo.paymentStatus =
                "paid";

            order.paymentInfo.transactionId =
                payment.id?.toString();

            order.paymentInfo.channel =
                payment.channel;

            order.paymentInfo.paidAt =
                payment.paid_at
                    ? new Date(payment.paid_at)
                    : new Date();

            order.orderStatus =
                "confirmed";

            await order.save();
        }

        // Always acknowledge webhook
        return res.sendStatus(200);

    } catch (error) {
        console.error(
            "Paystack webhook error:",
            error
        );

        return res.sendStatus(500);
    }
};