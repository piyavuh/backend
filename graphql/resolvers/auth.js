const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { showUserInfo } = require("./merge");

function getValueForNextSequence(sequenceOfName) {
  var sequenceDoc = db.sample.findAndModify({
    query: { _id: sequenceOfName },
    update: { $inc: { sequence_value: 1 } },
    new: true,
  });

  return sequenceDoc.sequence_value;
}
module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return showUserInfo(user);
      });
    } catch (err) {
      throw err;
    }
  },
  user: async () => {
    try {
      const users = await User.findOne({ Username: Username });

      return users.map((user) => {
        return showUserInfo(user);
      });
    } catch (err) {
      throw err;
    }
  },
  oneuser: async ({ Username }) => {
    const user = await User.findOne({ Username: Username });
    if (!user) {
      throw new Error("User does not exist!");
    }

    return showUserInfo(user);
  },oneuser_name: async ({ First_name }) => {
    const user = await User.findOne({ First_name: First_name });
    if (!user) {
      throw new Error("User does not exist!");
    }

    return showUserInfo(user);
  },

  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ _id: args.userInput._id });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.Password, 12);

      const user = new User({
        id: args.userInput.id,
        First_name: args.userInput.First_name,
        Last_name: args.userInput.Last_name,
        Sex: args.userInput.Sex,
        Birth_Day: args.userInput.Birth_Day,
        ID_card: args.userInput.ID_card,
        Email: args.userInput.Email,
        Username: args.userInput.Username,
        Password: hashedPassword,
        Tell_number: args.userInput.Tell_number,
        Tell_number2: args.userInput.Tell_number2,
        Facebook: args.userInput.Facebook,
        Line: args.userInput.Line,
      });

      const result = await user.save();

      return { ...result._doc, Password: null, _id: result._id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ Username, Password }) => {
    const user = await User.findOne({ Username: Username });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(Password, user.Password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.Username, Username: user.Username },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: user.Username, token: token, tokenExpiration: 1 };
  },
};
