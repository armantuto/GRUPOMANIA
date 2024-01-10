const { Model, DataTypes } = require("sequelize");
const { Post } = require("./post");
//const { database } = require("../databaseMMSQL");
const { database } = require("../connectionSequelize");


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de datos según tu necesidad (STRING para URL, BLOB para almacenar la imagen directamente, etc.)
    },
  },
  { tableName: "users", sequelize: database }
);

User.hasMany(Post, {
  foreignKey: { allowNull: false, name: "userId" },
});

Post.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
});


// // User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// // User.sync({ force: true }) - This creates the table, dropping it first if it already existed
// // User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.


module.exports = { User };