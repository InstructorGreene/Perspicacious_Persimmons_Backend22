const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Name is too short!"],
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Name is too short!"],
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      minLength: [11, "Telephone number is too short!"],
      maxLength: [12, "Telephone number is too short!"],
    },
    password: {
      type: String,
      required: true,
    },
    role: String,
    token: String,
  },
  { collection: "user" }
);

module.exports.User = mongoose.model("User", userSchema);
