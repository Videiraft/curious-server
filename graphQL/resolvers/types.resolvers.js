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
  user: (roadmap) => db.Users.findOne({
    where: { id: roadmap.UserId },
  }),
};

exports.Topic = {
  checklist: (topic) => db.ChecklistItems.findAll({
    include: [{
      model: db.Topics,
      where: { id: topic.id },
    }],
  }),
};
