// import User from "../models/user_schema.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";


// /**
//  * @description Register a new user
//  * @route POST /api/users/register
//  * @access Public
//  */


// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if(!name || !email || !password){
//             return res.status(400).json({ message: "Name, email and password are required" })
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if(!emailRegex.test(email)){
//             return res.status(401).json({ message: "Invalid email format" })
//         }

//         const existingUser = await User.findOne({ email: email });

//         if(existingUser){
//             return res.status(409).json({ message: "User with this email already exist" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const user = await User.create({
//             name: name.trim(),
//             email: email.trim(),
//             password: hashedPassword,
//         });

//         const token = jwt.sign(
//             { _id: user._id, email: user.email, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false, // Set to true in production
//             sameSite: "lax",
//             maxAge: 1000 * 60 * 60 * 24   // 1 day
//         });

//         res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         })
//     } catch (error) {
//         console.log("Error registering user:", error);
//         res.status(500).json({ message: error.message })
//     }
// }



// /**
//  * @description Login a user
//  * @route POST /api/users/login
//  * @access Public
//  */


// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if(!email || !password){
//             return res.status(400).json({ message: "Email and password are required" })
//         }

//         const existingUser = await User.findOne({ email: email });

//         if(!existingUser){
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, existingUser.password);

//         if(!isMatch){
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             { _id: existingUser._id, email: existingUser.email, role: existingUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // res.cookie("token", token, {
//         //     httpOnly: true,
//         //     secure: false, // Set to true in production
//         //     sameSite: "lax",
//         //     maxAge: 1000 * 60 * 60 * 24   // 1 day
//         // });

//         console.log("SETTING TOKEN COOKIE");

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "lax",
//             maxAge: 1000 * 60 * 60 * 24
//         });

//         console.log("TOKEN COOKIE SET");

//         res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 _id: existingUser._id,
//                 name: existingUser.name,
//                 email: existingUser.email,
//                 role: existingUser.role
//             },
//             token: token
//         })
//     } catch (error) {
//         console.log("Error logging in user:", error);
//         res.status(500).json({ message: error.message })
//     }
// }





// /**
//  * @description Logout a user
//  * @route POST /api/users/logout
//  * @access Private
//  */


// export const logoutUser = async (req, res) => {
//     try {
//         res.clearCookie("token");
//         res.status(200).json({ message: "User logged out successfully" });
//     } catch (error) {
//         console.log("Error logging out user:", error);
//         res.status(500).json({ message: error.message })
//     }
// }



// export const getCurrentUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select("-password");

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         res.status(200).json({
//             user
//         });

//     } catch (error) {
//         console.log("Error getting current user:", error);

//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// };










import User from "../models/user_schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import transporter from "../config/mailer.js";

const createToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// =====================================
// REGISTER
// POST /api/users/register
// =====================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: publicUser(user),
      token,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Failed to register user",
    });
  }
};

// =====================================
// LOGIN
// POST /api/users/login
// =====================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: publicUser(user),
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Failed to log in",
    });
  }
};

// =====================================
// LOGOUT
// POST /api/users/logout
// =====================================

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Failed to log out",
    });
  }
};

// =====================================
// GET CURRENT USER
// GET /api/users/me
// =====================================

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -passwordResetToken -passwordResetExpires"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Failed to retrieve user",
    });
  }
};

// =====================================
// UPDATE PROFILE
// PUT /api/users/profile
// =====================================

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name === undefined && email === undefined) {
      return res.status(400).json({
        message: "Provide a name or email to update",
      });
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: "Name cannot be empty",
      });
    }

    const updates = {};

    if (name !== undefined) {
      updates.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: req.user._id },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "That email is already in use",
        });
      }

      updates.email = normalizedEmail;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -passwordResetToken -passwordResetExpires");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// =====================================
// FORGOT PASSWORD
// POST /api/users/forgot-password
// Body: { email }
// =====================================

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // Use the same response whether the account exists or not.
    const successMessage =
      "If an account exists for this email, a password reset link will be sent.";

    if (!user) {
      return res.status(200).json({
        message: successMessage,
      });
    }

    // Generate a random token; only its hash is stored in MongoDB.
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save({ validateBeforeSave: false });

    const frontendUrl = (
      process.env.FRONTEND_URL || "http://localhost:3000"
    ).replace(/\/$/, "");

    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    try {
      await transporter.sendMail({
        from: `"Cedar Court" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Reset your Cedar Court password",
        text: [
          `Hello ${user.name},`,
          "",
          "We received a request to reset your Cedar Court password.",
          `Use this link to choose a new password: ${resetUrl}`,
          "",
          "This link expires in 15 minutes.",
          "If you did not request this, you can ignore this email.",
        ].join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#ede4d4;background:#0c0a08">
            <h1 style="color:#c4954a">Cedar Court</h1>
            <h2>Reset your password</h2>
            <p>Hello ${user.name},</p>
            <p>We received a request to reset your password.</p>
            <p style="margin:28px 0">
              <a href="${resetUrl}" style="background:#c4954a;color:#0c0a08;padding:14px 22px;text-decoration:none;display:inline-block">
                Reset Password
              </a>
            </p>
            <p>This link expires in 15 minutes.</p>
            <p>If you did not request a password reset, you can ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      // Don't leave a valid reset token behind when delivery fails.
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      console.error("Password reset email error:", emailError);

      return res.status(500).json({
        message: "Unable to send the password reset email. Please try again.",
      });
    }

    return res.status(200).json({
      message: successMessage,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Unable to process the password reset request",
    });
  }
};

// =====================================
// RESET PASSWORD
// POST /api/users/reset-password/:token
// Body: { password }
// =====================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Reset token and new password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    // Make the reset token unusable after a successful reset.
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Failed to reset password",
    });
  }
};