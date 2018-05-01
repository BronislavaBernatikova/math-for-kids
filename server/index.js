const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const knex = require('./db');
const moment = require('moment');

const index = require('./routes/index');

//creating app object using our imported express module:
const app = express();

//adding CORS support to my server (https://enable-cors.org/server.html):
app.use(function(req, res, next) {
  console.log('Adding CORS headers');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

//view engine setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// console.log(process.env.MATH_FOR_KIDS_SECRET_KEY)
// app.set('jwtTokenSecret', process.env.MATH_FOR_KIDS_SECRET_KEY);

//next set of functions call "app.use()" to add the midleware libraries into
//the request handling chain.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//we use the Express.static midleware to get Express to serve all the static
//files in the directory /public in the project root
app.use(express.static(path.join(__dirname, 'public')));
//middleware to log information about our request in terminal:
app.use((req, res, next) => {
  console.log(`${req.method} – ${req.path} – ${new Date().toString()}`);
  next();
});

//creating current user with the token:
app.use(function setCurrentUser (req, res, next){
  //console.log('in setCurrentUser function');
  const token = ( req.headers['authorization']);
  // console.log('headers:', req.headers);

  if(token){

      const payload = jwt.decode(token, process.env.MATH_FOR_KIDS_SECRET_KEY); //app.get('jwtTokenSecret')
      const userId = parseInt(payload['id']);
      req.currentUser = false;
      //console.log('currentUser: ', req.currentUser);

      knex
        .first()
        .from('users')
        .where('id', userId)
        .then( user => {
          req.currentUser = user;
          // console.log('req.currentUser:', req.currentUser);
          next();
        })
  } else {
    next();
  }
});

//now we add our (previously imported) routehandling code to the request
//handling chain.
app.use('/',index);

const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`Server listenning on http://${DOMAIN}:${PORT}`);
});

module.exports = app;
