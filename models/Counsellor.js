const mongoose = require('mongoose');

const counsellorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  sessionPrice: Number,
  bio: String,
  image: String,
  experience: String,
  specialties: [String],
  languages: [String],
  availableHours: [String], // Example: ["09:00", "10:00", "14:00"]
});

module.exports = mongoose.model('Counsellor', counsellorSchema);
