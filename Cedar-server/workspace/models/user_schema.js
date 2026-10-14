// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user"
//     },
//     isEmailVerified: {
//         type: Boolean,
//         default: false
//     },
//     passwordResetToken: {
//         type: String,
//     },
//     passwordResetExpires: {
//         type: Date,
//     }
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);

// export default User;











import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: {
      type: String,
      default: undefined,
    },

    passwordResetExpires: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;