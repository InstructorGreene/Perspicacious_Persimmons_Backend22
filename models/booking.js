const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Name is too short!"],
      maxLength: 15,
    },
    businessName: String,
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
    stallType: String,
    comments: String,
    status: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "bookings" }
);

module.exports.Booking = mongoose.model("Booking", bookingSchema);
