module.exports = `
  type Query {
    roadmaps (id: ID): [Roadmap]
    topics (RoadmapId: ID TopicId: ID): [Topic]
  }
  `;
