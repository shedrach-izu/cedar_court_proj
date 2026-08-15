import mongoose from "mongoose";

const apartmentAmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ApartmentAmenity = mongoose.model("ApartmentAmenity", apartmentAmenitySchema);

export default ApartmentAmenity;