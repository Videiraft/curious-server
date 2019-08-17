
const types = require('./types.resolvers');
const queries = require('./queries.resolvers');
const mutations = require('./mutations.resolvers');

module.exports = {
  Query: {
    roadmaps: queries.roadmaps,
    topics: queries.topics,
  },
  Mutation: {
    signup: mutations.signup,
    login: mutations.login,
    createRoadmap: mutations.createRoadmap,
    updateRoadmap: mutations.updateRoadmap,
    deleteRoadmap: mutations.deleteRoadmap,
    createTopic: mutations.createTopic,
    updateTopic: mutations.updateTopic,
    deleteTopic: mutations.deleteTopic,
    createChecklistItem: mutations.createChecklistItem,
    updateChecklistItem: mutations.updateChecklistItem,
    deleteChecklistItem: mutations.deleteChecklistItem,
  },
  User: types.User,
  Roadmap: types.Roadmap,
  Topic: types.Topic,
};
