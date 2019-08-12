module.exports = `
  type Mutation {
    createRoadmap (
      title: String!
      category: String!
    ): Roadmap!

    updateRoadmap (
      id: Int!
      title: String!
      category: String!
    ): Roadmap!

    deleteRoadmap (id: Int!): Roadmap!

    createTopic (
      title: String!
    ): Topic!

    updateTopic (
      id: Int!
      title: String
      description: String
      resources: String
      completed: Boolean
      checklist: [ChecklistItem]
    ): Topic!
    
    deleteTopic (id: Int!): Topic!

    createUser (
      name: String!
      email: String!
      password: String!
    ): User!
  }
`;
