const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")

console.log(config)
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to database successfully"))
  .catch(console.log)

const app = express();

app.use(express.json());

app.use("/uploads", express.static("./uploads"))

app.use("/api/stations", require("./routes/api/controllers/stations"))
app.use("/api/trips", require("./routes/api/controllers/trips"))
app.use("/api/users", require("./routes/api/controllers/users"))
app.use("/api/tickets", require("./routes/api/controllers/tickets"))

const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})