const { Model, DataTypes } = require("sequelize");
const { User } = require("./user");
const { Post } = require("./post");
//const { database } = require("../databaseMMSQL");
const { database } = require("../connectionSequelize");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
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
  { tableName: "comments", sequelize: database }
);

User.hasMany(Comment, {
    foreignKey: {allowNull: false, name: "userId"},
    onDelete: 'NO ACTION'
})
Comment.belongsTo(User, {
    foreignKey: {allowNull: false, name: "userId"},
    
})


Post.hasMany(Comment, {
    foreignKey: {allowNull: false, name: "postId"},
  
  
})

Comment.belongsTo(Post, {
    foreignKey: {allowNull: false, name: "postId"},
    
  
})





module.exports = {  Comment };
