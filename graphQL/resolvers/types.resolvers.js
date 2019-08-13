const db = require('../../models/index');

exports.User = {
  roadmaps: (user) => db.Roadmaps.findAll({
    include: [{
      model: db.Users,
      where: { id: user.id },
    }],
  }),
};

exports.Roadmap = {
  topics: (roadmap) => db.Topics.findAll({
    include: [{
      model: db.Roadmaps,
      where: { id: roadmap.id },
    }],
  }),
};

exports.Topic = {
  checklist: (topic) => db.ChecklistItems.findAll({
    include: [{
      model: db.ChecklistItems,
      where: { id: topic.id },
    }],
  }),
};
