
const types = require('./types.resolvers');
const queries = require('./queries.resolvers');
const mutations = require('./mutations.resolvers');

module.exports = {
  Query: {
    user: queries.user,
  },
  Mutation: {
    createUser: mutations.createUser,
  },
  User: types.User,
  Roadmap: types.Roadmap,
  Topic: types.Topic,
};
