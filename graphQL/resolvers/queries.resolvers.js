const { AuthenticationError } = require('apollo-server');
const db = require('../../models/index');

exports.roadmaps = async (obj, args, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  if (!args.id) {
    const allRoadmaps = await db.Roadmaps.findAll();
    return allRoadmaps;
  }
  if (args.id === String(user.id)) {
    const roadmaps = await db.Roadmaps.findAll({ where: { UserId: args.id } });
    return roadmaps;
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
