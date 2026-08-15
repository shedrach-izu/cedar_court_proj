import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory",
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true })

const Menu = mongoose.model("Menu", menuSchema);

export default Menu