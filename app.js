const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./graphQL/schemas');
const resolvers = require('./graphQL/resolvers');

function getUser(rawToken) { // eslint-disable-line consistent-return
  if (rawToken.length) {
    // Bearer eyJ0eXAiOiJKV1Q...
    const token = rawToken.slice(7, rawToken.length);
    // return the decoded user if the token is valid
    return jwt.verify(token, process.env.JWT_SECRET);
  }
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
