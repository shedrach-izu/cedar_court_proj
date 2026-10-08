import User from "../models/user_schema.js";
import Apartment from "../models/apartment_schema.js";
import Booking from "../models/booking_schema.js";
import Order from "../models/order_schema.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// ======================================================
// ADMIN LOGIN
// ======================================================

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "Admin account not found"
            });
        }

        // Make sure the account belongs to an admin
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admins only."
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Store JWT in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Change to true in production
            sameSite: "lax",
            maxAge: 1000 * 60 * 60
        });

        return res.status(200).json({
            message: "Admin logged in successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Error logging in admin:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ======================================================
// GET ADMIN PROFILE
// ======================================================

export const getAdminProfile = async (req, res) => {
    try {
        const adminUser = await User.findById(req.user._id)
            .select("_id name email role");

        if (!adminUser) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            user: adminUser
        });

    } catch (error) {
        console.log("Error fetching admin profile:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ======================================================
// GET ADMIN DASHBOARD STATISTICS
// ======================================================

export const getAdminStats = async (req, res) => {
    try {

        // ==================================================
        // BASIC DASHBOARD COUNTS
        // ==================================================

        const totalBookings = await Booking.countDocuments();

        const totalGuests = await User.countDocuments({
            role: "user"
        });

        const occupiedApartments = await Apartment.countDocuments({
            status: "booked"
        });

        const pendingOrders = await Order.countDocuments({
            orderStatus: "pending"
        });


        // ==================================================
        // TOTAL REVENUE
        // ==================================================

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    "paymentInfo.paymentStatus": "paid"
                }
            },
            {
                $group: {
                    _id: null,

                    totalRevenue: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // ==================================================
        // MONTHLY REVENUE
        // ==================================================
        //
        // We use Order.createdAt because your Order schema
        // has timestamps enabled.
        //
        // The result will be converted into all 12 months
        // below, so the frontend always receives Jan-Dec.
        //
        // ==================================================

        const monthlyRevenueResult = await Order.aggregate([
            {
                $match: {
                    "paymentInfo.paymentStatus": "paid"
                }
            },

            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt"
                        },

                        month: {
                            $month: "$createdAt"
                        }
                    },

                    revenue: {
                        $sum: "$totalPrice"
                    }
                }
            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);


        // ==================================================
        // CREATE 12-MONTH REVENUE DATA
        // ==================================================

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const currentYear = new Date().getFullYear();

        const monthlyRevenue = monthNames.map(
            (month, index) => {

                const monthNumber = index + 1;

                const foundMonth = monthlyRevenueResult.find(
                    (item) =>
                        item._id.year === currentYear &&
                        item._id.month === monthNumber
                );

                return {
                    month,
                    revenue: foundMonth
                        ? foundMonth.revenue
                        : 0
                };
            }
        );


        // ==================================================
        // APARTMENT TYPES
        // ==================================================

        const apartmentTypes = await Apartment.aggregate([

            // Group apartments by category
            {
                $group: {
                    _id: "$category",

                    count: {
                        $sum: 1
                    }
                }
            },

            // Get category information
            {
                $lookup: {
                    from: "apartmentcategories",

                    localField: "_id",

                    foreignField: "_id",

                    as: "category"
                }
            },

            // Convert category array into object
            {
                $unwind: {
                    path: "$category",

                    preserveNullAndEmptyArrays: true
                }
            },

            // Return only what the dashboard needs
            {
                $project: {
                    _id: 0,

                    name: {
                        $ifNull: [
                            "$category.title",
                            "Unknown"
                        ]
                    },

                    count: 1
                }
            },

            // Largest categories first
            {
                $sort: {
                    count: -1
                }
            }
        ]);


        // ==================================================
        // RECENT BOOKINGS
        // ==================================================

        const recentBookings = await Booking.find()
            .sort({
                createdAt: -1
            })
            .limit(5)

            // Guest information
            .populate(
                "user",
                "name email"
            )

            // Apartment information
            .populate(
                "apartment",
                "title price gallery category"
            )

            .lean();


        // ==================================================
        // RETURN DASHBOARD DATA
        // ==================================================

        return res.status(200).json({

            statistics: {

                // Cards
                totalBookings,
                totalGuests,
                occupiedApartments,
                pendingOrders,
                totalRevenue,

                // Charts
                monthlyRevenue,
                apartmentTypes,

                // Table
                recentBookings
            }

        });

    } catch (error) {

        console.log(
            "Error fetching admin statistics:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};