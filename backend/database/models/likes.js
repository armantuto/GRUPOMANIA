const { Model, DataTypes } = require("sequelize");
const { database } = require("../connectionSequelize");
const { User } = require("./user");
const { Post } = require("./post");
//const { database } = require("../databaseMMSQL");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    postId: {
        type: DataTypes.INTEGER,
        model: "posts", 
        key: "id"
    },

    userId: {
      type: DataTypes.INTEGER,
      model: "users", // <<< Note, its table's name, not object name
      key: "id", // <<< Note, its a column name
    },
    
  },
  { tableName: "likes", sequelize: database }
);

User.hasMany(Like, {
    foreignKey: {allowNull: false, name: "userId"},
    onDelete: 'NO ACTION' 
})
Like.belongsTo(User, {
    foreignKey: {allowNull: false, name: "userId"}
})


Post.hasMany(Like, {
    foreignKey: {allowNull: false, name: "postId"}
})

Like.belongsTo(Post, {
    foreignKey: {allowNull: false, name: "postId"}
})


 //Like.sync() //ESTO LO USO CON SEQUALIZE EN LOCAL ARCHIVO

module.exports = {  Like };