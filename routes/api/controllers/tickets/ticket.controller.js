const { Ticket } = require("../../../../models/Ticket");
const { Seat } = require("../../../../models/Seat");
const { Trip } = require("../../../../models/Trip");
const { sendBookTicketEmail } = require("../../../../services/email/bookTicket");
const _ = require("lodash");

// book ticket
const createTicket = (req, res, next) => {
  // userId lay tu toke
  const { tripId, seatCodes } = req.body; // seatCodes = ["A01", "A02"]
  const { _id: userId } = req.user;
  // const _userId = req.user._id;
  Trip
    .findById(tripId)
    .populate("fromStationId")
    .populate("toStationId")
    .then(trip => {
      if (!trip) return Promise.reject({
        status: 404,
        message: "Trip not found"
      })

      const availableSeatCodes = trip.seats
        .filter(seat => !seat.isBooked)
        .map(seat => seat.code)

      const errSeatCodes = []
      seatCodes.forEach(code => {
        if (availableSeatCodes.indexOf(code) === -1) errSeatCodes.push(code);
      })

      if (!_.isEmpty(errSeatCodes)) return Promise.reject({
        status: 400,
        message: `${errSeatCodes.join(", ")} is/are not available`
      })

      const newTicket = new Ticket({
        userId, tripId,
        seats: seatCodes.map(code => new Seat({ code })),
        totalPrice: seatCodes.length * trip.price
      })

      seatCodes.forEach(code => {
        const seatIndex = trip.seats.findIndex(seat => seat.code === code)
        trip.seats[seatIndex].isBooked = true
      })

      return Promise.all([
        newTicket.save(),
        trip.save()
      ])
    })
    .then(([ticket, trip]) => {
      sendBookTicketEmail(
        req.user,
        trip,
        ticket
      );
      res.status(200).json(ticket)
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })
      return res.json(err)
    })
}

module.exports = {
  createTicket
}