const types = require('./types.resolvers');
const queries = require('./queries.resolvers');
const mutations = require('./mutations.resolvers');
const { authMiddleware } = require('./middlewares');

module.exports = {
  Query: {
    roadmaps: authMiddleware(queries.roadmaps),
    topics: authMiddleware(queries.topics),
  },
  Mutation: {
    signup: mutations.signup,
    login: mutations.login,
    createRoadmap: authMiddleware(mutations.createRoadmap),
    updateRoadmap: authMiddleware(mutations.updateRoadmap),
    deleteRoadmap: authMiddleware(mutations.deleteRoadmap),
    createTopic: authMiddleware(mutations.createTopic),
    updateTopic: authMiddleware(mutations.updateTopic),
    deleteTopic: authMiddleware(mutations.deleteTopic),
    createChecklistItem: authMiddleware(mutations.createChecklistItem),
    updateChecklistItem: authMiddleware(mutations.updateChecklistItem),
    deleteChecklistItem: authMiddleware(mutations.deleteChecklistItem),
    copyRoadmap: authMiddleware(mutations.copyRoadmap),
  },
  User: types.User,
  Roadmap: types.Roadmap,
  Topic: types.Topic,
};
