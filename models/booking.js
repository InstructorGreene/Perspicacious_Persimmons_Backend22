const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookingSchema = new Schema(
  {
    businessName: String,
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
