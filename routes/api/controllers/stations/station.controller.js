const { Station } = require("../../../../models/Station");
const _ = require("lodash");

const getStations = (req, res, next) => {
  Station.find()
    .then(stations => {
      res.status(200).json(stations);
    })
    .catch(err => res.json(err))
}

const getStationById = (req, res, next) => {
  const { id } = req.params
  Station.findById(id)
    .then(station => res.status(200).json(station))
    .catch(err => res.json(err))
}

const postStation = (req, res, next) => {
  // const { name, address, province } = req.body

  const newStation = new Station(req.body)
  newStation.save()
    .then(station => {
      res.status(201).json(station)
    })
    .catch(err => res.json(err))
}

// replace
const putStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station not found"
      })

      const keys = ["name", "address", "province"]
      keys.forEach(key => {
        station[key] = req.body[key]
      })
      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => res.json(err))
}

// update
const patchStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station not found"
      })
      // const { name, province, address } = req.body;
      // station.name = name ? name : station.name;
      // if (name) station.name = name
      // if (province) station.province = province
      // if (address) station.address = address

      Object.keys(req.body).forEach(key => {
        station[key] = req.body[key]
      })

      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => res.json(err))
}

const deleteStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station not found"
      })
      return Promise.all([
        Station.deleteOne({ _id: id }),
        station
      ])
    })
    .then(result => res.status(200).json(result[1]))
    .catch(err => res.json(err))
}

module.exports = {
  getStations,
  getStationById,
  postStation,
  putStationById,
  patchStationById,
  deleteStationById
}