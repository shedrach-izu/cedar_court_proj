// import mongoose from "mongoose";

// function generateBookingId(){
//     let id = "";
//     let chars = "1234567890";

//     for(let i = 0; i < 4; i++){
//         id += chars[Math.floor(Math.random() * chars.length)]
//     }

//     return `BK-${id}`
// }

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     apartment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Apartment",
//       required: true,
//     },

//     checkIn: {
//       type: Date,
//       required: true,
//     },

//     checkOut: {
//       type: Date,
//       required: true,
//     },

//     guests: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     nights: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     pricePerNight: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     subtotal: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     serviceFee: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     tax: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "confirmed",
//         "cancelled",
//         "completed",
//       ],
//       default: "pending",
//     },

//     paymentStatus: {
//       type: String,
//       enum: [
//         "unpaid",
//         "paid",
//         "refunded",
//       ],
//       default: "unpaid",
//     },
//     paymentReference: {
//       type: String,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Booking = mongoose.model("Booking", bookingSchema);

// export default Booking;










import mongoose from "mongoose";

function generateBookingId() {
  let id = "";
  const chars = "0123456789";

  for (let i = 0; i < 4; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return `BK-${id}`;
}

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      default: generateBookingId,
      immutable: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    nights: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

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

    tax: {
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
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
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

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;