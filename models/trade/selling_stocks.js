const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellingStockSchema = new Schema(
  {
    stock: {
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SellingStock', SellingStockSchema);