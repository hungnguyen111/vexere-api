const express = require("express");
const stationController = require("./station.controller");
const { authenticate, authorize } = require("../../../../middlewares/auth");

const router = express.Router();

// /api + /stations => /api/stations
router.get("/", stationController.getStations);
router.get("/:id", stationController.getStationById);
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  stationController.postStation
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  stationController.putStationById
);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  stationController.patchStationById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  stationController.deleteStationById
);

module.exports = router;