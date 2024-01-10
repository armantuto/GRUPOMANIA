const { Model, DataTypes } = require("sequelize");
//const { database } = require("../databaseMMSQL");
const { database } = require("../connectionSequelize");


class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      model: "users", // <<< Note, its table's name, not object name
      key: "id", // <<< Note, its a column name
    },
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
  },
  { tableName: "posts", sequelize: database }
);



module.exports = { Post };
