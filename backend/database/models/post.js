const { Model, DataTypes } = require("sequelize");
// const { database } = require("../connection");
const { database } = require("../database");


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

// Post.sync(); ESTO LO USO CON SEQUALIZE EN LOCAL ARCHIVO


module.exports = { Post };
