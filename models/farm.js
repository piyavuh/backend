const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const farmSchema = new Schema({
  Farm_number: {
    type: String,
    required: true,
  },
  Farm_Village: {
    type: String,
    required: false,
  },
  Farm_Road: {
    type: String,
    required: false,
  },
  Farm_Village_number: {
    type: String,
    required: false,
  },
  Farm_alley: {
    type: String,
    required: false,
  },
  Farm_postcode: {
    type: String,
    required: true,
  },
  Farm_canton: {
    type: String,
    required: true,
  },
  Farm_District: {
    type: String,
    required: true,
  },
  Farm_Province : {
    type: String,
    required: true,
  },
  Farm_owner: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

module.exports = mongoose.model("Farm", farmSchema);
