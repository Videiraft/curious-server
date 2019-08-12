module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = function associate(db) {
    db.Users.hasMany(db.Roadmaps);
  };

  return Users;
};
