module.exports = `
  type Query {
    roadmaps (id: ID, category: String, title: String, offset: Int, limit: Int): [Roadmap]
    topics (RoadmapId: ID TopicId: ID): [Topic]
  }
  `;
