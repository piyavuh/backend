const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shareSchema = new Schema({
  Value: {
    type: Number,
    required: true,
  },
  Count: {
    type: Number,
    required: true,
  },
  Num_start: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  }, 
  Status:{
    type: Boolean,
    require:true
  },
  Share_owner: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

module.exports = mongoose.model("Share", shareSchema);
