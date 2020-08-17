const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  code: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
})

const Seat = mongoose.model("Seat", SeatSchema, "Seat");

module.exports = {
  SeatSchema, Seat
}