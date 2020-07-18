const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const officerSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  privilege: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Officer', officerSchema);