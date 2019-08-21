const { AuthenticationError } = require('apollo-server');
const Sequelize = require('sequelize');
const db = require('../../models/index');

const { Op } = Sequelize;

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.roadmaps = async (obj, args, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');

  if (args.title) {
    const regex = escapeRegexCharacters(args.title.trim());
    const where = {
      title: { [Op.iRegexp]: regex },
    };
    if (args.category) where.category = args.category;
    return db.Roadmaps.findAll(
      {
        offset: args.offset || 0,
        limit: args.limit || 20,
        where,
      },
    );
  }

  if (args.category) {
    return db.Roadmaps.findAll({
      offset: args.offset || 0,
      limit: args.limit || 20,
      where: { category: args.category },
    });
  }
  // returns one roadmap by id
  if (args.id) {
    return db.Roadmaps.findAll({
      where: { id: args.id },
    });
  }
  // returns all roadmaps
  if (!args.UserId) {
    const test = await db.Roadmaps.findAll({
      offset: args.offset || 0,
      limit: args.limit || 20,
    });
    return test;
  }
  // Return all roadmaps from the logedin user
  if (args.UserId === String(user.id)) {
    return db.Roadmaps.findAll({
      offset: args.offset || 0,
      limit: args.limit || 20,
      where: { UserId: args.UserId },
    });
  }
  throw new Error('incorrect user');
};

exports.topics = async (obj, args, { user }) => {
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
