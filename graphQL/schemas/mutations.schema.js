module.exports = `
  type Mutation {
    signup (
      name: String!
      email: String!
      password: String!
    ): String

    login (
      email: String!
      password: String!
    ): String

    createRoadmap (
      id: ID!
      title: String!
      category: String!
    ): Roadmap!

    updateRoadmap (
      id: ID!
      title: String
      category: String
    ): Roadmap!

    deleteRoadmap (id: ID!): String!

    createTopic (
      id: ID!
      title: String!
    ): Topic!

    updateTopic (
      id: ID!
      title: String
      description: String
      resources: String
      completed: Boolean
    ): Topic!

    deleteTopic (id: ID!): String!

    createChecklistItem (
      id: ID!
      title: String! 
    ): ChecklistItem!

    updateChecklistItem (
      id: ID!
      title: String
      completed: Boolean
    ): ChecklistItem!

    deleteChecklistItem (id: ID!): String
  }

`;
