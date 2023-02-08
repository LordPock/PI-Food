const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
  });
};