const Stock = require("../../models/stock");
const User = require("../../models/user");

const { showStockInfo } = require("./merge");

module.exports = {
  stocks: async () => {
    try {
      const stocks = await Stock.find();
      return stocks.map((stock) => {
        return showStockInfo(stock);
      });
    } catch (err) {
      throw err;
    }
  },
  createStock: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const stock = new Stock({
      value: +args.stockInput.value,
      date: new Date(args.stockInput.date),
    });
    let createdStock;
    try {
      const result = await stock.save();
      createdStock = showStockInfo(result);

      return createdStock;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};


