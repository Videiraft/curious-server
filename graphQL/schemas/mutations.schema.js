module.exports = `
  type Mutation {
    createUser (
      name: String!
      email: String!
      password: String!
    ): User

    createRoadmap (
      title: String!
      category: String!
    ): Roadmap!

    updateRoadmap (
      id: ID!
      title: String
      category: String
    ): Roadmap!

    deleteRoadmap (id: ID!): Roadmap!

    createTopic (
      title: String!
    ): Topic!

    updateTopic (
      id: ID!
      title: String
      description: String
      resources: String
      completed: Boolean
    ): Topic!

    deleteTopic (id: ID!): Topic!
  }
`;
