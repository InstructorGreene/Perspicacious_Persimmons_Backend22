const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookingSchema = new Schema(
  {
    businessName: String,
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
