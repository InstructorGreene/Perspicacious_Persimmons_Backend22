const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookingSchema = new Schema(
  {
    businessName: String,
    stallType: String,
    comments: String,
    bstatus: { type: String, default: "created" },
    pitch: { type: Number, default: "000" },
    date: {
      type: Date,
      default: Date.now,
    },
    userid: String,
  },
  { collection: "bookings" }
);

module.exports.Booking = mongoose.model("Booking", bookingSchema);
