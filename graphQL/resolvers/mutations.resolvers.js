const bcrypt = require('bcrypt');
const db = require('../../models/index');

exports.createUser = async (obj, args) => {
  const { name, email, password } = args;
  const user = await db.Users.findOne({ where: { email } });

  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const hash = await bcrypt.hash(password, saltRounds);

  if (user) {
    console.log('email already exists'); // eslint-disable-line no-console
    return null;
  }

  const newUser = await db.Users.create({
    name, email, password: hash,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    jwtToken: '',
    roadmaps: [],
  };
};

exports.createRoadmap = async (obj, args) => {
  const { title, category } = args;
  const roadmap = await db.Roadmaps.create({
    title, category,
  });

  return {
    id: roadmap.id,
    title: roadmap.title,
    category: roadmap.category,
    topics: [],
  };
};
