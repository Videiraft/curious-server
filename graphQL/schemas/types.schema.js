module.exports = `
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    jwtToken: String
    roadmaps: [Roadmap]
  }
  type Roadmap {
    id: Int!
    title: String!
    category: String!
    topics: [Topic]
  }
  type Topic {
    id: Int!
    title: String!
    description: String
    resources: String
    completed: Boolean!
    checklist: [ChecklistItem] 
  }
  type ChecklistItem {
    id: Int!
    title: String!
    completed: Boolean!
  }
`;
