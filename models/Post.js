const { Sequelize, Model, DataType } = require('sequelize');
const sequelize = require('./config/connection');

class Post extends Model{}

Post.init(
  {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncremement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.String,
    },
    body: {
      type: DataType.string,
    },

    //refrences User Model using a refrence key....
    userId: {
        type: DataTypes.INTEGER,
        refrences: {
          model:'User',
          key:'id',
        },
      },
  },
  {
    sequelize
  }
);

module.exports = Post;
