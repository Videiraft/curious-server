const bcrypt = require('bcrypt');
const db = require('../../models/index');

exports.user = async (obj, { email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) return console.log('user does not exist'); // eslint-disable-line no-console
  const match = bcrypt.compare(password, user.password);
  if (!match) return console.log('wrong password'); // eslint-disable-line no-console
  return user;
};

// TODO: line 8 should create and store JWT token for the user in the db.users table

exports.userByToken = async (obj, { jwtToken }) => {
  const user = await db.Users.findOne({ where: { jwtToken } });
  if (!user) return console.log('authentication error'); // eslint-disable-line no-console
  return user;
};
