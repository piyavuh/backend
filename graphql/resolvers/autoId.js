const AutoId = require("../../models/autoId");
const User = require("../../models/user");

const { showAutoIdInfo } = require("./merge");

module.exports = {
  autoIds: async () => {
    try {
      const autoIds = await AutoId.find();
      console.log(autoIds);
      console.log(autoIds[0].id);
      AutoId.findByIdAndUpdate(
        autoIds[0].id,
        {
          $set: {
            memberId: autoIds[0].memberId+1,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        }
        
      );

      return autoIds.map((autoId) => {
        return showAutoIdInfo(autoId);
      });
    } catch (err) {
      throw err;
    }
  },
  createAutoId: async (args, req) => {
    const autoId = new AutoId({
      memberId: +args.autoIdInput.memberId,
    });
    let createdAutoId;
    try {
      const result = await autoId.save();
      createdAutoId = showAutoIdInfo(result);
        console.log(createdAutoId)
      return createdAutoId;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
