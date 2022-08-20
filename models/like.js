"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(
        models.User
        //   , {
        //   foreignKey: "userId",
        //   targetKey: "userId",
        //   onUpdate: "cascade",
        //   onDelete: "cascade",
        // }
      );
    }
  }
  Like.init(
    {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      likeUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  // Like.associate = function (models) {
  //   Like.belongsTo(models.User, {
  //     foreignKey: "userId",
  //     targetKey: "userId",
  //     onUpdate: "cascade",
  //     onDelete: "cascade",
  //   });
  // };
  return Like;
};
