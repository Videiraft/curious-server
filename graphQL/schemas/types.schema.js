module.exports = `
  type User {
    id: ID!
    name: String!
    email: String!
    jwtToken: String
    roadmaps: [Roadmap]!
  }
  type Roadmap {
    id: ID!
    title: String!
    category: String!
    topics: [Topic]!
  }
  type Topic {
    id: ID!
    title: String!
    description: String!
    resources: String!
    completed: Boolean!
    checklist: [ChecklistItem]!
  }
  type ChecklistItem {
    id: ID!
    title: String!
    completed: Boolean!
  }
`;
