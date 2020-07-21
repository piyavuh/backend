const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const autoIdSchema = new Schema({
   memberId: {
    type: Number,
    required: true
  },
 
});

module.exports = mongoose.model('AutoId', autoIdSchema);