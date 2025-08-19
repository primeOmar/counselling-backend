// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  counsellorId: String,
  date: String, // ISO Date string
  timeSlot: String,
  phoneNumber: String,
  notes: String,
  frequency: String,
  paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
