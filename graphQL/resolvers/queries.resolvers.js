const { AuthenticationError } = require('apollo-server');
const db = require('../../models/index');

exports.roadmaps = async (obj, args, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const roadmaps = await db.Roadmaps.findAll({ where: { UserId: user.id } });
  return roadmaps;
};
