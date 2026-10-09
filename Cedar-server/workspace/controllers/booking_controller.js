import mongoose from "mongoose";
import Booking from "../models/booking_schema.js";
import Apartment from "../models/apartment_schema.js";

/**
 * @description Create a booking
 * @route POST /api/booking/create
 * @access Private
 */
export const createBooking = async (req, res) => {
    try {
        const user = req.user?._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const {
            apartment,
            checkIn,
            checkOut,
            guests,
        } = req.body;

        // --------------------------------
        // Validate required fields
        // --------------------------------

        if (!apartment || !checkIn || !checkOut || !guests) {
            return res.status(400).json({
                message: "Apartment, check-in, check-out and guests are required",
            });
        }

        // --------------------------------
        // Validate apartment ID
        // --------------------------------

        if (!mongoose.Types.ObjectId.isValid(apartment)) {
            return res.status(400).json({
                message: "Invalid apartment ID",
            });
        }

        // --------------------------------
        // Validate guests
        // --------------------------------

        const guestCount = Number(guests);

        if (!Number.isInteger(guestCount) || guestCount < 1) {
            return res.status(400).json({
                message: "Guests must be at least 1",
            });
        }

        // --------------------------------
        // Find apartment
        // --------------------------------

        const existingApartment = await Apartment.findById(apartment);

        if (!existingApartment) {
            return res.status(404).json({
                message: "Apartment not found",
            });
        }

        // --------------------------------
        // Check apartment availability
        // --------------------------------

        if (
            existingApartment.status &&
            existingApartment.status.toLowerCase() !== "available"
        ) {
            return res.status(400).json({
                message: "This apartment is currently unavailable",
            });
        }

        // --------------------------------
        // Validate guest capacity
        // --------------------------------

        if (
            existingApartment.guests &&
            guestCount > existingApartment.guests
        ) {
            return res.status(400).json({
                message: `This apartment can accommodate a maximum of ${existingApartment.guests} guests`,
            });
        }

        // --------------------------------
        // Convert dates
        // --------------------------------

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (
            isNaN(checkInDate.getTime()) ||
            isNaN(checkOutDate.getTime())
        ) {
            return res.status(400).json({
                message: "Invalid check-in or check-out date",
            });
        }

        // --------------------------------
        // Check date order
        // --------------------------------

        if (checkOutDate <= checkInDate) {
            return res.status(400).json({
                message: "Check-out date must be after check-in date",
            });
        }

        // --------------------------------
        // Calculate nights
        // --------------------------------

        const difference =
            checkOutDate.getTime() - checkInDate.getTime();

        const nights = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (nights < 1) {
            return res.status(400).json({
                message: "Booking must be at least one night",
            });
        }

        // --------------------------------
        // Check overlapping bookings
        // --------------------------------

        const existingBooking = await Booking.findOne({
            apartment: apartment,

            checkIn: {
                $lt: checkOutDate,
            },

            checkOut: {
                $gt: checkInDate,
            },

            status: {
                $in: ["pending", "confirmed"],
            },
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "Apartment is not available for these dates",
            });
        }

        // --------------------------------
        // Calculate price
        // --------------------------------

        const pricePerNight = Number(existingApartment.price);

        const subtotal = pricePerNight * nights;

        const serviceFee = subtotal * 0.10;

        const tax = subtotal * 0.12;

        const totalAmount =
            subtotal +
            serviceFee +
            tax;

        // --------------------------------
        // Create booking
        // --------------------------------

        const booking = await Booking.create({
            user,

            apartment,

            checkIn: checkInDate,

            checkOut: checkOutDate,

            guests: guestCount,

            nights,

            pricePerNight,

            subtotal,

            serviceFee,

            tax,

            totalAmount,

            status: "pending",

            paymentStatus: "unpaid",
        });

        // --------------------------------
        // Return booking
        // --------------------------------

        return res.status(201).json({
            message: "Booking created successfully",

            booking,
        });

    } catch (error) {
        console.error(
            "Error creating booking:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to create booking",
        });
    }
};


/**
 * @description Get a user's single booking
 * @route GET /api/booking/:id
 * @access Private
 */
export const getUserBooking = async (req, res) => {
    try {
        const user = req.user?._id;

        const { id } = req.params;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (!id) {
            return res.status(400).json({
                message: "Booking ID required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid booking ID",
            });
        }

        const booking = await Booking.findOne({
            _id: id,
            user,
        })
            .populate("apartment")
            .populate("user", "-password");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        return res.status(200).json({
            message: "Booking retrieved successfully",

            booking,
        });

    } catch (error) {
        console.error(
            "Error getting user booking:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to retrieve booking",
        });
    }
};


/**
 * @description Get all bookings belonging to the logged-in user
 * @route GET /api/booking/my-bookings
 * @access Private
 */
export const getMyBookings = async (req, res) => {
    try {
        const user = req.user?._id;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const bookings = await Booking.find({
            user,
        })
            .populate("apartment")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            message: "Bookings retrieved successfully",

            bookings,
        });

    } catch (error) {
        console.error(
            "Error getting user bookings:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to retrieve bookings",
        });
    }
};


/**
 * @description Cancel a user's booking
 * @route PUT /api/booking/:id/cancel
 * @access Private
 */
export const cancelBooking = async (req, res) => {
    try {
        const user = req.user?._id;

        const { id } = req.params;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid booking ID",
            });
        }

        const booking = await Booking.findOne({
            _id: id,
            user,
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled",
            });
        }

        if (booking.status === "completed") {
            return res.status(400).json({
                message: "Completed bookings cannot be cancelled",
            });
        }

        booking.status = "cancelled";

        await booking.save();

        return res.status(200).json({
            message: "Booking cancelled successfully",

            booking,
        });

    } catch (error) {
        console.error(
            "Error cancelling booking:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Failed to cancel booking",
        });
    }
};



/**
 * @description Get all bookings for admin
 * @route GET /api/admin/bookings
 * @access Admin
 */
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate(
                "user",
                "name email"
            )
            .populate(
                "apartment",
                "title price gallery category"
            )
            .sort({
                createdAt: -1,
            })
            .lean();

        return res.status(200).json({
            message: "All bookings retrieved successfully",
            bookings,
        });

    } catch (error) {
        console.log(
            "Error fetching all bookings:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};