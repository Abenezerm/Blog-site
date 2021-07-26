//configure sequilize as ORM...
const Sequelize = require('sequelize');

//configure our variables in the dotenv file
require('dotenv').config();

//create a connections to our db...
//checks to see if jawsDb is the process enviroment, if not it checks for dotenv variables to acess MySQL
const sequilize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

  module.exports = sequilize;
