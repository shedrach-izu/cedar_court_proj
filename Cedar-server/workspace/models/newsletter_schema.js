
// import mongoose from "mongoose";
// import { randomBytes } from "crypto";

// const newsletterSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
//     },

//     status: {
//       type: String,
//       enum: ["active", "unsubscribed"],
//       default: "active",
//       index: true,
//     },

//     subscribedAt: {
//       type: Date,
//       default: Date.now,
//     },

//     unsubscribedAt: {
//       type: Date,
//       default: null,
//     },

//     unsubscribeToken: {
//       type: String,
//       default: () => randomBytes(32).toString("hex"),
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Newsletter =
//   mongoose.models.Newsletter ||
//   mongoose.model("Newsletter", newsletterSchema);

// export default Newsletter;












import mongoose from "mongoose";
import { randomBytes } from "crypto";

// Generate a custom subscription ID
function generateSubscriptionId() {
    let id = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (let i = 0; i < 4; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }

    return `SUB-${id}`;
}

const newsletterSchema = new mongoose.Schema(
    {
        // Custom subscriber ID
        subscriptionId: {
            type: String,
            default: generateSubscriptionId,
            unique: true,
        },

        // Subscriber email
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email",
            ],
        },

        // Subscription status
        status: {
            type: String,
            enum: ["active", "unsubscribed"],
            default: "active",
            index: true,
        },

        // Subscription dates
        subscribedAt: {
            type: Date,
            default: Date.now,
        },

        unsubscribedAt: {
            type: Date,
            default: null,
        },

        // Used to generate unsubscribe links
        unsubscribeToken: {
            type: String,
            default: () => randomBytes(32).toString("hex"),
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Newsletter =
    mongoose.models.Newsletter ||
    mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
