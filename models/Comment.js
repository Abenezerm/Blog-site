const { Sequelize, Model, DataType } = require('sequelize');
const sequelize = require('./config/connection');

class Comment extends Model{}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        refrences: {
          model:'User',
          key:'id',
        },
      },
      
      postID: {
        type: DataType.INTEGER,
        refrences: {
          model: 'Post',
          key: 'id',
        }
      }
  },
  {
    sequelize
  }
);

module.exports = Post;
