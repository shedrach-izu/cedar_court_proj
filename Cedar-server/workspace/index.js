import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routers/user_route.js";
import apartmentCategoryRouter from "./routers/apartment_category_route.js";
import apartmentAmenityRouter from "./routers/apartment_amenity_route.js";
import apartmentRouter from "./routers/apartment_route.js";
import menuCategoryRouter from "./routers/menu_category_route.js";
import menuRouter from "./routers/menu_route.js";
import galleryCategoryRouter from "./routers/gallery_category_route.js";
import galleryRouter from "./routers/gallery_route.js";
import cartRouter from "./routers/cart_route.js";
//import restaurantRouter from "./routers/restaurant_order_route.js";
import orderRouter from "./routers/order_route.js";
import paymentRouter from "./routers/payment_route.js";
import reviewRouter from "./routers/review_route.js";
import bookingRouter from "./routers/booking_route.js";
import adminRouter from "./routers/admin_route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
    "/api/payment/webhook",
    express.raw({
        type: "application/json"
    })
);

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

app.use("/api/authentication", userRouter);
app.use("/api/apartment-category", apartmentCategoryRouter);
app.use("/api/apartment-amenity", apartmentAmenityRouter);
app.use("/api/apartment", apartmentRouter);
app.use("/api/menu-category", menuCategoryRouter);
app.use("/api/menu", menuRouter);
app.use("/api/gallery-category", galleryCategoryRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/cart", cartRouter);
//app.use("/api/restaurant-order", restaurantRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);


const startServer = async () => {
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
    }catch(error){
      console.log("Error starting the server:", error);
      process.exit(1);
    }
}

startServer();
