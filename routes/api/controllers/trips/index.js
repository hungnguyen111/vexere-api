const express = require("express");
const tripController = require("./trip.controller");

const router = express.Router()

router.get("/", tripController.getTrips)
router.get("/:id", tripController.getTripById)
router.post("/", tripController.postTrip)
router.delete("/:id", tripController.deleteTripById)

module.exports = router;