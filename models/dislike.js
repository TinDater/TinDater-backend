"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Dislike.belongsTo(models.User);
    }
  }
  Dislike.init(
    {
      dislikeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      dislikeUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dislike",
    }
  );

  Dislike.associate = function (models) {
    Dislike.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
  };
  return Dislike;
};
