const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const db = require('../../models/index');

exports.signup = async (obj, { name, email, password }) => {
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
  const valid = bcrypt.compare(password, user.password);
  if (!valid) return console.log('wrong password'); // eslint-disable-line no-console

  user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(user, process.env.JWT_SECRET);
};

exports.createRoadmap = async (obj, { UserId, title, category }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const roadmap = await db.Roadmaps.create({ title, category, UserId });
  return { ...roadmap.dataValues, topics: [] };
};

exports.updateRoadmap = async (obj, { id, title, category }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const update = await db.Roadmaps.update({ title, category },
    { where: { id }, returning: true });
  return update[1][0].dataValues;
};

exports.deleteRoadmap = async (obj, { id }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const deletion = await db.Roadmaps.destroy({ where: { id } });
  if (!deletion) throw new Error('roadmap does not exist');
  return id;
};

exports.createTopic = async (obj, { title, rowNumber, RoadmapId }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const rowItems = await db.Topics.findAll({
    where: {
      RoadmapId,
      rowNumber,
    },
  });
  if (rowItems.length >= 5) throw new Error('Maximum number of topics per row reached');
  const topic = await db.Topics.create({ title, rowNumber, RoadmapId });
  return { ...topic.dataValues, checklist: [] };
};

exports.updateTopic = async (obj, args, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const {
    id,
    title,
    description,
    resources,
    completed,
    rowNumber,
  } = args;

  const update = await db.Topics.update({
    title,
    description,
    resources,
    completed,
    rowNumber,
  }, { where: { id }, returning: true });

  return update[1][0].dataValues;
};

exports.deleteTopic = async (obj, { id }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const deletion = await db.Topics.destroy({ where: { id } });
  if (!deletion) throw new Error('topic does not exist');
  return id;
};

exports.createChecklistItem = async (obj, { TopicId, title }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const checklistItem = await db.ChecklistItems.create({
    title,
    TopicId,
  });
  if (!checklistItem) {
    throw new Error('Internal Server Error: Could not create ChecklistItem');
  }
  return { ...checklistItem.dataValues };
};

exports.updateChecklistItem = async (obj, { id, title, completed }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const update = await db.ChecklistItems.update({ title, completed },
    { where: { id }, returning: true });
  return update[1][0].dataValues;
};

exports.deleteChecklistItem = async (obj, { id }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const deletion = await db.ChecklistItems.destroy({ where: { id } });
  if (!deletion) throw new Error('checklist item does not exist');
  return id;
};
