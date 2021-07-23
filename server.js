//Dependecies...
const path = require('path');//To navogate directory...
const express = require('express');//Express
const session  = require('express-session'); //to keep track of user data on site..
const exphbs  = require('express-handlebars'); //handlebars...
const helpers = require('./utils/helpers');
const sequilize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001; //set port..

const hbs = exphbs.create({})

//Initilize sequilize with session store...
const SequilzeStore = require('connect-session-sequelize')(session.store);

//set up session and connects to sequelize db...
const sess = {
  secret: process.env.SECRET,
  cookie:{}, //Tells session to use cookies...
  resave: false,
  //sets up session store..
  store: new SequilzeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

//set the view engine to handlebars...
app.engine('handlebars', hbs.engine);
app.set('veiw engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')))//serves the public folder
//serves routes...
app.use(require('./controllers/'));

//starts listening on port...
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  sequilize.sync({ force: false});
});
