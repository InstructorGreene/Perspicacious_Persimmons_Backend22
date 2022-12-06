const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    mobileNumber: {
      type: Number,
    },
    password: {
      type: String,
      require: true,
    },
    role: { type: String, default: "StallHolder" },
    token: { type: String, default: "" },
  },
  { collection: "user" }
);

module.exports.User = mongoose.model("User", userSchema);
