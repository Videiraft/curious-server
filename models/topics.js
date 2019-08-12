module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resources: {
      type: DataTypes.STRING,
    },
  });

  Topics.associate = function associate(db) {
    db.Topics.belongsTo(db.Roadmaps, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    db.Topics.hasMany(db.ChecklistItems);
  };

  return Topics;
};
