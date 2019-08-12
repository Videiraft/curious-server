module.exports = (sequelize, DataTypes) => {
  const ChecklistItems = sequelize.define('ChecklistItems', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  ChecklistItems.associate = function associate(db) {
    db.ChecklistItems.belongsTo(db.Topics, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return ChecklistItems;
};
