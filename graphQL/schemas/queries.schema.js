module.exports = `
  type Query {
    roadmaps (UserId: ID, id: ID, category: String, title: String, offset: Int, limit: Int): [Roadmap]
    topics (RoadmapId: ID TopicId: ID): [Topic]
  }
  `;
