import User from "../models/user_schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


/**
 * @description Register a new user
 * @route POST /api/users/register
 * @access Public
 */


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(401).json({ message: "Invalid email format" })
        }

        const existingUser = await User.findOne({ email: email });

        if(existingUser){
            return res.status(409).json({ message: "User with this email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword,
            role: role || "user"
        });

        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24   // 1 day
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: error.message })
    }
}



/**
 * @description Login a user
 * @route POST /api/users/login
 * @access Public
 */


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" })
        }

        const existingUser = await User.findOne({ email: email });

        if(!existingUser){
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24   // 1 day
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            token: token
        })
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: error.message })
    }
}



/**
 * @description Logout a user
 * @route POST /api/users/logout
 * @access Private
 */


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error logging out user:", error);
        res.status(500).json({ message: error.message })
    }
}