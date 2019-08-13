const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');

exports.signup = async (obj, args) => {
  const { name, email, password } = args;
  const user = await db.Users.findOne({ where: { email } });

  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const hash = await bcrypt.hash(password, saltRounds);

  if (user) {
    console.log('email already exists'); // eslint-disable-line no-console
    return null;
  }

  let newUser = await db.Users.create({
    name, email, password: hash,
  });
  newUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  return jwt.sign(newUser, process.env.JWT_SECRET);
};

exports.login = async (obj, { email, password }) => {
  let user = await db.Users.findOne({ where: { email } });
  if (!user) return console.log('user does not exist'); // eslint-disable-line no-console
  const match = bcrypt.compare(password, user.password);
  if (!match) return console.log('wrong password'); // eslint-disable-line no-console

  user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(user, process.env.JWT_SECRET);
};

exports.createRoadmap = async (obj, args) => {
  const { title, category } = args;
  const roadmap = await db.Roadmaps.create({
    title, category,
  });

  return { ...roadmap, topics: [] };
};

// exports.updateRoadmap = async (obj, args, context) => {
// };

// exports.deleteRoadmap = async (obj, args, context) => {};

// exports.createTopic = async (obj, args, context) => {};

// exports.updateTopic = async (obj, args, context) => {};

// exports.deleteTopic = async (obj, args, context) => {};

// exports.createChecklistItem = async (obj, args, context) => {};

// exports.updateChecklistItem = async (obj, args, context) => {};

// exports.deleteChecklistItem = async (obj, args, context) => {};
