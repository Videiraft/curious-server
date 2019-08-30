const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');

exports.signup = async (obj, { name, email, password }) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const hash = await bcrypt.hash(password, saltRounds);
  if (await db.Users.findOne({ where: { email } })) {
    return '';
  }
  const newUser = await db.Users.create({
    name, email, password: hash,
  });
  const responseUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
  return jwt.sign(responseUser, process.env.JWT_SECRET);
};

exports.login = async (obj, { email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) return '';
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return jwt.sign(loggedInUser, process.env.JWT_SECRET);
  }
  return '';
};

exports.createRoadmap = async (obj, { UserId, title, category }) => {
  const roadmap = await db.Roadmaps.create({ title, category, UserId });
  return { ...roadmap.dataValues, topics: [] };
};

exports.updateRoadmap = async (obj, { id, title, category }) => {
  const update = await db.Roadmaps.update({ title, category },
    { where: { id }, returning: true });
  return update[1][0].dataValues;
};

exports.deleteRoadmap = async (obj, { id }) => {
  const deletion = await db.Roadmaps.destroy({ where: { id } });
  if (!deletion) throw new Error('Roadmap does not exist');
  return id;
};

exports.createTopic = async (obj, { title, rowNumber, RoadmapId }) => {
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

exports.updateTopic = async (obj, args) => {
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

exports.deleteTopic = async (obj, { id }) => {
  const deletion = await db.Topics.destroy({ where: { id } });
  if (!deletion) throw new Error('Topic does not exist');
  return id;
};

exports.createChecklistItem = async (obj, { TopicId, title }) => {
  const checklistItem = await db.ChecklistItems.create({
    title,
    TopicId,
  });
  if (!checklistItem) {
    throw new Error('Could not create ChecklistItem');
  }
  return { ...checklistItem.dataValues };
};

exports.updateChecklistItem = async (obj, { id, title, completed }) => {
  const update = await db.ChecklistItems.update({ title, completed },
    { where: { id }, returning: true });
  return update[1][0].dataValues;
};

exports.deleteChecklistItem = async (obj, { id }) => {
  const deletion = await db.ChecklistItems.destroy({ where: { id } });
  if (!deletion) throw new Error('Checklist item does not exist');
  return id;
};

exports.copyRoadmap = async (obj, { id }, { user }) => {
  const originalRoadmap = await db.Roadmaps.findOne({ where: { id } });
  const originalTopics = await db.Topics.findAll({
    where: { RoadmapId: originalRoadmap.id },
    raw: true,
  });
  const copyRoadmap = await db.Roadmaps.create({
    title: originalRoadmap.title,
    category: originalRoadmap.category,
    UserId: user.id,
  });
  const copyTopics = originalTopics.map((topic) => {
    topic.RoadmapId = copyRoadmap.id; // eslint-disable-line no-param-reassign
    delete topic.id; // eslint-disable-line no-param-reassign
    return topic;
  });
  await db.Topics.bulkCreate(copyTopics);
  return 'Success';
};
