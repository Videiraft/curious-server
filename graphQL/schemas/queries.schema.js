module.exports = `
  type Query {
    roadmaps (id: ID!): [Roadmap]
    topics (id: ID!): [Topic]
    allRoadmaps: [Roadmap] 
  }
  `;
