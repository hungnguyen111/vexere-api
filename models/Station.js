const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String }
})

const Station = mongoose.model("Station", StationSchema, "Station")

module.exports = {
  StationSchema, Station
}