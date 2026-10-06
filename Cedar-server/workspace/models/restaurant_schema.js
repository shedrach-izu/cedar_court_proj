import mongoose from "mongoose";

const restaurantOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    reservation: {
      date: {
        type: Date,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      guests: {
        type: Number,
        required: true,
        min: 1,
      },

      specialRequests: {
        type: String,
        trim: true,
        default: "",
      },
    },

    items: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    serviceFee: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "unpaid",
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "unpaid",
    },

    paymentReference: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const RestaurantOrder = mongoose.model(
  "RestaurantOrder",
  restaurantOrderSchema
);

export default RestaurantOrder;