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
      UserId: ID!
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
      RoadmapId: ID!
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
      TopicId: ID!
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
