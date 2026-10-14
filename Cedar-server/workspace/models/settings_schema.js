
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
      default: "Cedar Court Serviced Apartments",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default: "hello@cedarcourt.ng",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      default: "+234 1 700 2000",
    },

    address: {
      type: String,
      required: true,
      trim: true,
      default: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
    },

    checkInTime: {
      type: String,
      default: "14:00",
    },

    checkOutTime: {
      type: String,
      default: "12:00",
    },

    currency: {
      type: String,
      enum: ["NGN", "USD", "GBP", "EUR"],
      default: "NGN",
    },

    taxRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 10,
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Keep one settings document for the entire property.
const Settings =
  mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);

export default Settings;
