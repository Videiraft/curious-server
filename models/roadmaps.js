module.exports = (sequelize, DataTypes) => {
  const Roadmaps = sequelize.define('Roadmaps', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Roadmaps.associate = function associate(db) {
    db.Roadmaps.belongsTo(db.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    db.Roadmaps.hasMany(db.Topics);
  };

  return Roadmaps;
};
