import Cart from "../models/cart_schema.js";
import Menu from "../models/menu_schema.js";
import RestaurantOrder from "../models/restaurant_schema.js";

/**
 * @description Create restaurant order/reservation
 * @route POST /api/restaurant-order/create
 * @access Private
 */
export const createRestaurantOrder = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !guests
    ) {
      return res.status(400).json({
        message: "All reservation fields are required",
      });
    }

    const guestCount = Number(guests);

    if (guestCount < 1) {
      return res.status(400).json({
        message: "Number of guests must be at least 1",
      });
    }

    const reservationDate = new Date(date);

    if (isNaN(reservationDate.getTime())) {
      return res.status(400).json({
        message: "Invalid reservation date",
      });
    }

    /*
     * Get the authenticated user's cart.
     */
    const cart = await Cart.findOne({ user });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    /*
     * Make sure the menu items still exist
     * and are still available.
     *
     * Also get the current prices from the database.
     */
    const orderItems = [];

    for (const cartItem of cart.items) {
      const menuItem = await Menu.findById(cartItem.menu);

      if (!menuItem) {
        return res.status(404).json({
          message: "A menu item in your cart no longer exists",
        });
      }

      if (!menuItem.isAvailable) {
        return res.status(400).json({
          message: `${menuItem.title} is currently unavailable`,
        });
      }

      orderItems.push({
        menu: menuItem._id,
        quantity: cartItem.quantity,
        price: menuItem.price,
      });
    }

    /*
     * Calculate the totals on the backend.
     * Never trust totals coming from the frontend.
     */
    const subtotal = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const serviceFee = subtotal * 0.1;

    const totalAmount = subtotal + serviceFee;

    /*
     * Create the restaurant order/reservation.
     */
    const order = await RestaurantOrder.create({
      user,

      customer: {
        name,
        email,
        phone,
      },

      reservation: {
        date: reservationDate,
        time,
        guests: guestCount,
        specialRequests: specialRequests || "",
      },

      items: orderItems,

      subtotal,
      serviceFee,
      totalAmount,

      status: "pending",
      paymentStatus: "unpaid",
    });

    res.status(201).json({
      message: "Restaurant order created successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Error creating restaurant order:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};