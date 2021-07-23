const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./config/connection')

//create User Model
class User extends Model{
  //sets up instance method to check password per user....
  checkPassword(loginPW){
    return bcrypt.compareSync(loginPW, this.password);
  }
}

//model details...
User.innit(
{
  id: {
    type: DataTypes.INTEGER,
    allowsNull: false,
    primaryKey: true,
    autoIncremement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowsNull: false,
    validate: {
      len: [6]
    }
  }
},
{
  hooks: {
    //set up hooks to make sure that passwords are hashed beofre storage and creation...
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    beforeCreate: async (updatedUserData) => {
      updatedUserData.password = await bycrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'User'
}
);
