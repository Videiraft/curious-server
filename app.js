const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
