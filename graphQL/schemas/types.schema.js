module.exports = `
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
    roadmaps: [Roadmap]!
  }
  type Roadmap {
    id: ID
    title: String
    category: String
    topics: [Topic]
  }
  type Topic {
    id: ID!
    title: String!
    description: String!
    resources: String!
    completed: Boolean!
    rowNumber: Int!
    checklist: [ChecklistItem]
  }
  type ChecklistItem {
    id: ID!
    title: String!
    completed: Boolean!
  }
`;
