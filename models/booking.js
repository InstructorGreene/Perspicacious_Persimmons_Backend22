const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  name: String,
  businessName: String,
  email: String,
  telephone: String,
  type: String,
  comments: String,
  files: String,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports.Booking = mongoose.model("Booking", bookingSchema);
