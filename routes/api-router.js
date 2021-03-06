const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {getHotelChains, deleteHotelChain} = require('./hotel-chain-router');
const {getHotels, getCapacityByHotel, createHotel, deleteHotel, updateHotel} = require('./hotel-router');
const {getRooms, getRoom, getRoomsByArea, createRoom, deleteRoom, updateRoom} = require('./room-router');
const {
  getEmployees, getEmployeesByHotelChain, getEmployee, deleteEmployee, createEmployee, updateEmployee
} = require('./employee-router');
const {getCustomers, getCustomer, deleteCustomer, createCustomer, updateCustomer} = require('./customer-router');
const {
  getBookings, getRoomsAvailableForBooking, createBooking, getSearchOptions, getAmountOfUpcomingBookings
} = require('./booking-router');
const {getRoomsAvailableForRent, createRental, checkIn} = require('./rental-router');
const {getCalendar} = require('./calendar-router');

router.get('/calendar', getCalendar);

router.get("/hotels/capacity", getCapacityByHotel);

router.get("/hotel-chains", getHotelChains);

router.get("/hotel-chains/:hotelChainName/hotels", getHotels);
router.get("/hotel-chains/:hotelChainName/employees", getEmployeesByHotelChain);
router.get("/hotel-chains/:hotelChainName/upcoming-bookings", getAmountOfUpcomingBookings);

router.delete("/hotel-chains/:hotelChainName", deleteHotelChain);

router.delete("/hotel-chains/:hotelChainName/:hotelId", deleteHotel);
router.put("/hotel-chains/:hotelChainName/:hotelId", updateHotel);
router.post("/hotel-chains/:hotelChainName/hotels", createHotel);

router.get("/hotel-chains/:hotelChainName/:hotelId/rooms", getRooms);
router.get("/hotel-chains/:hotelChainName/:hotelId/bookings", getBookings);
router.get("/hotel-chains/:hotelChainName/:hotelId/rentals", getRoomsAvailableForRent);
router.get("/hotel-chains/:hotelChainName/:hotelId/:roomNumber", getRoom);

router.delete("/hotel-chains/:hotelChainName/:hotelId/:roomNumber", deleteRoom);
router.put("/hotel-chains/:hotelChainName/:hotelId/:roomNumber", updateRoom);

router.post("/hotel-chains/:hotelChainName/:hotelId/rooms", createRoom);
router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/rent", createRental);
router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/book", createBooking);

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:employeeId", getEmployee);
router.put("/employees/:employeeId", updateEmployee);
router.delete("/employees/:employeeId", deleteEmployee);

router.post("/customers", createCustomer);
router.get("/customers", getCustomers);
router.put("/customers/:customerId", updateCustomer);
router.delete("/customers/:customerId", deleteCustomer);
router.get("/customers/:customerId", getCustomer);

router.get("/bookings/search-options", getSearchOptions);
router.post("/bookings/:bookingId/check-in", checkIn);

router.get("/rooms", getRoomsAvailableForBooking);
router.get("/areas/rooms", getRoomsByArea);

router.use((req, res, next) =>
  next(new createError.NotFound(`API Endpoint not found [${req.url}]`))
);

module.exports = router;
