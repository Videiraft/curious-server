const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers.js');

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
