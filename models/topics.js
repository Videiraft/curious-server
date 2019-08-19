module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    resources: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rowNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
