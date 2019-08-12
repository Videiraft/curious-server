const db = require('../../models/index');

exports.user = {
  roadmaps: (user) => db.roadmaps.findAll({
    include: [{
      model: db.Users,
      where: { id: user.id },
    }],
  }),
};

exports.roadmap = {
  topics: (roadmap) => db.roadmaps.findAll({
    include: [{
      model: db.Roadmaps,
      where: { id: roadmap.id },
    }],
  }),
};

exports.topic = {
  checklist: (topic) => db.topics.findAll({
    include: [{
      model: db.ChecklistItems,
      where: { id: topic.id },
    }],
  }),
};
