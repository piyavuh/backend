const Stock = require("../../models/stock");
const SellingStock = require("../../models/trade/selling_stocks");
const { showStockInfo, showSellingStockInfo } = require("./merge");

module.exports = {
  sellingStocks: async (args,req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated!');
    }
    try {
      const sellingStocks = await SellingStock.find();
      return sellingStocks.map((sellingStock) => {
        return showSellingStockInfo(sellingStock);
      });
    } catch (err) {
      throw err;
    }
  },
  createSellingStock: async (args,req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated!');
    }
    try {
      const fetchedStock = await Stock.findOne({ _id: args.stockID });
      const sellingStock = new SellingStock({
        user: req.userId,
        stock: fetchedStock,
      });
      const result = await sellingStock.save();
      return showSellingStockInfo(result);
    } catch (err) {
      throw err;
    }
  },
  cancelSellingStock: async (args,req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated!');
    }
    try {
      const sellingStock = await SellingStock.findById(
        args.sellingStockId
      ).populate("stock");
      const stock = showStockInfo(sellingStock.stock);
      await SellingStock.deleteOne({ _id: args.sellingStockId });
      return stock;
    } catch (err) {
      throw err;
    }
  },
};
