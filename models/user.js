"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(
      //   models.Like
      //   //   , {
      //   //   foreignKey: "userId",
      //   //   sourceKey: "userId",
      //   //   onUpdate: "cascade",
      //   //   onDelete: "cascade",
      //   // }
      // );
      // User.hasMany(
      //   models.Dislike
      //   //   , {
      //   //   foreignKey: "userId",
      //   //   sourceKey: "userId",
      //   //   onUpdate: "cascade",
      //   //   onDelete: "cascade",
      //   // }
      // );
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      imageUrl: DataTypes.STRING,
      interest: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Like, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
    User.hasMany(models.Dislike, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
      constraints: false,
    });
  };
  return User;
};
