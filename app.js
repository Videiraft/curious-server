const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const typeDefs = require('./graphQL/schemas');
const resolvers = require('./graphQL/resolvers');

function getUser(rawToken) {
  if (rawToken.length) {
    const token = rawToken.slice(7, rawToken.length);
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  return undefined;
}

const app = new ApolloServer({
  typeDefs,
  resolvers,
  // Create token for validation
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    return { user };
  },
});

module.exports = app;
