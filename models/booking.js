const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookingSchema = new Schema(
  {
    businessName: String,
    stallType: String,
    comments: String,
    status: { type: String, default: "created" },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: String,
  },
  { collection: "bookings" }
);

module.exports.Booking = mongoose.model("Booking", bookingSchema);
