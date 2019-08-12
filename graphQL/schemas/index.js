const { gql } = require('apollo-server');

const types = require('./types.schema');
const queries = require('./queries.schema');
const mutations = require('./mutations.schema');

module.exports = gql`
  ${types}
  ${queries}
  ${mutations}
`;
