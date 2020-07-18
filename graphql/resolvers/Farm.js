const Farm = require('../../models/farm');
const User = require('../../models/user');

const { showFarmInfo } = require('./merge');

module.exports = {
  farms: async () => {
    try {
      const farms = await Farm.find();
      return farms.map(farm => {
        return showFarmInfo(farm);
      });
    } catch (err) {
      throw err;
    }
  },
  createFarm: async (args, req) => {
    const farm = new Farm({
        Farm_number: args.farmInput.Farm_number,
        Farm_Village: args.farmInput.Farm_Village,
        Farm_Road: args.farmInput.Farm_Road,
        Farm_Village_number: args.farmInput.Farm_Village_number,
        Farm_alley: args.farmInput.Farm_alley,
        Farm_postcode: args.farmInput.Farm_postcode,
        Farm_canton: args.farmInput.Farm_canton,
        Farm_District: args.farmInput.Farm_District,
        Farm_Province: args.farmInput.Farm_Province,
        Farm_owner: args.farmInput.Farm_owner,
    });
    let createdFarm;
    try {
      const result = await farm.save();
      createdFarm = showFarmInfo(result);
      const Farm_owner = await User.findById(args.farmInput.Farm_owner);

      if (!Farm_owner) {
        throw new Error('User not found.');
      }
      Farm_owner.Own_farm.push(farm);
      await Farm_owner.save();

      return createdFarm;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
