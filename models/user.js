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
