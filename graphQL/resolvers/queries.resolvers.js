const { AuthenticationError } = require('apollo-server');
const Sequelize = require('sequelize');
const db = require('../../models/index');

const { Op } = Sequelize;

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.roadmaps = async (obj, args, { user }) => {
  // Check if the user is logged in
  if (!user) throw new AuthenticationError('You must be logged in');

  const findQuery = { offset: args.offset || 0, limit: args.limit || 20 };
  // Create the where property for the database query, if applicable
  if (args.title) {
    const regex = escapeRegexCharacters(args.title.trim());
    findQuery.where = { title: { [Op.iRegexp]: regex } };
  }
  if (args.category) findQuery.where = { ...findQuery.where, category: args.category };
  if (args.id) findQuery.where = { ...findQuery.where, id: args.UserId };
  if (args.UserId === String(user.id)) findQuery.where = { UserId: args.UserId };
  return db.Roadmaps.findAll(findQuery);
};

exports.topics = async (obj, args, { user }) => {
  // Check if the user is logged in
  if (!user) throw new AuthenticationError('You must be logged in');
  const { RoadmapId, TopicId } = args;
  if (TopicId) {
    const topic = await db.Topics.findOne({ where: { id: TopicId } });
    return [topic];
  }
  if (RoadmapId) {
    const topics = await db.Topics.findAll({ where: { RoadmapId } });
    return topics;
  }
  throw new Error('please pass either a TopicId or a RoadmapId');
};
