
import Settings from "../models/settings_schema.js";

// GET /api/settings
// Public: retrieve the current property settings.
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create the default settings document on the first request.
    if (!settings) {
      settings = await Settings.create({});
    }

    return res.status(200).json({
      message: "Settings fetched successfully",
      settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);

    return res.status(500).json({
      message: "Unable to fetch settings",
    });
  }
};

// PUT /api/settings
// Admin only: update property settings.
export const updateSettings = async (req, res) => {
  try {
    const {
      hotelName,
      email,
      phone,
      address,
      checkInTime,
      checkOutTime,
      currency,
      taxRate,
      maintenanceMode,
    } = req.body;

    // Only allow the fields managed by this settings page.
    const updates = {};

    if (hotelName !== undefined) {
      if (typeof hotelName !== "string" || !hotelName.trim()) {
        return res.status(400).json({
          message: "Property name is required",
        });
      }

      updates.hotelName = hotelName.trim();
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({
          message: "Please provide a valid email address",
        });
      }

      updates.email = email.trim().toLowerCase();
    }

    if (phone !== undefined) {
      if (typeof phone !== "string" || !phone.trim()) {
        return res.status(400).json({
          message: "Phone number is required",
        });
      }

      updates.phone = phone.trim();
    }

    if (address !== undefined) {
      if (typeof address !== "string" || !address.trim()) {
        return res.status(400).json({
          message: "Property address is required",
        });
      }

      updates.address = address.trim();
    }

    if (checkInTime !== undefined) {
      if (
        typeof checkInTime !== "string" ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(checkInTime)
      ) {
        return res.status(400).json({
          message: "Check-in time must use HH:mm format",
        });
      }

      updates.checkInTime = checkInTime;
    }

    if (checkOutTime !== undefined) {
      if (
        typeof checkOutTime !== "string" ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(checkOutTime)
      ) {
        return res.status(400).json({
          message: "Check-out time must use HH:mm format",
        });
      }

      updates.checkOutTime = checkOutTime;
    }

    if (currency !== undefined) {
      if (!["NGN", "USD", "GBP", "EUR"].includes(currency)) {
        return res.status(400).json({
          message: "Unsupported currency",
        });
      }

      updates.currency = currency;
    }

    if (taxRate !== undefined) {
      const parsedTaxRate = Number(taxRate);

      if (
        taxRate === "" ||
        !Number.isFinite(parsedTaxRate) ||
        parsedTaxRate < 0 ||
        parsedTaxRate > 100
      ) {
        return res.status(400).json({
          message: "Service charge must be between 0 and 100",
        });
      }

      updates.taxRate = parsedTaxRate;
    }

    if (maintenanceMode !== undefined) {
      if (typeof maintenanceMode !== "boolean") {
        return res.status(400).json({
          message: "Maintenance mode must be true or false",
        });
      }

      updates.maintenanceMode = maintenanceMode;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No settings were provided to update",
      });
    }

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    Object.assign(settings, updates);

    await settings.save();

    return res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);

    return res.status(500).json({
      message: "Unable to update settings",
    });
  }
};
