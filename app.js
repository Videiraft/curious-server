const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphQL/schemas');
const resolvers = require('./graphQL/resolvers');

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
