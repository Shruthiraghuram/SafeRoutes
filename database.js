const mongoose = require('mongoose');

const CrimeReportSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number
  },
  description: String,
  reportedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CrimeReport', CrimeReportSchema);
