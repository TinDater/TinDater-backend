"use strict";
require("express");
const fs = require("fs");
const path = require("path");
const sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.User = require("./user.js");
// db.Like = require("./like.js");
// db.Dislike = require("./dislike.js");

// db.sequelize = sequelize;

// User.init(sequelize);
// Like.init(sequelize);
// Dislike.init(sequelize);

// User.associate(db);
// Like.associate(db);
// Dislike.associate(db);
////////

// db.User.hasMany(db.Like, {
//   foreignKey: "userId",
//   sourceKey: "userId",
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// db.User.hasMany(db.Dislike, {
//   foreignKey: "userId",
//   sourceKey: "userId",
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });
// db.Like.belongsTo(db.User, {
//   foreignKey: "userId",
//   targetKey: "userId",
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });

// db.Dislike.belongsTo(db.User, {
//   foreignKey: "userId",
//   targetKey: "userId",
//   onUpdate: "cascade",
//   onDelete: "cascade",
// });

// db.Note.hasMany(db.Like);
// db.Like.belongsTo(db.Note, {
//   foreignKey: "fk_note_id"
// });
// db.User.hasMany(db.Like, { as: "L" });
// db.Like.belongsTo(db.User, {
//   foreignKey: "fk_user_id",
//   as: "userid"
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
