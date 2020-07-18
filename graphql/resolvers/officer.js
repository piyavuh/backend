const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Officer = require('../../models/officer');

module.exports = {
  createOfficer: async args => {
    try {
      const existingOfficer = await Officer.findOne({ id: args.officerInput.id });
      if (existingOfficer) {
        throw new Error('Officer exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.officerInput.password, 12);

      const officer = new Officer({
        id: args.officerInput.id,
        password: hashedPassword,
        privilege: args.officerInput.privilege
      });

      const result = await officer.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login_off: async ({ id, password }) => {
    const officer = await Officer.findOne({ id: id });
    if (!officer) {
      throw new Error('Officer does not exist!');
    }
    const isEqual = await bcrypt.compare(password, officer.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: officer.id, id: officer.id },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { userId: officer.id, token: token, tokenExpiration: 1 };
  }
};