const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');
//const Expressions = require('../controllers/expressions');
const Users = require('../controllers/users_controller');
const Quizes = require('../controllers/quizes_controller');
const Token = require('../controllers/token_controller');


// middleware function to check for logged-in users
const authentication = (req, res, next) => {
  if(   req.currentUser !== false){
    //console.log('req.currentUser from authentication: ', req.currentUser);
    //console.log('token from auth: ', token);
    next();
    }
    else {
      res.redirect('/sessions/new');
    }
};

router.get('/', (req, res) => {
  //console.log('req.session in routes file:', req.session);
  res.render('welcome');
});


const userRouter = express.Router();
router.use('/users', userRouter);
userRouter.get('/signUp', Users.new);
userRouter.post('/create', Users.create);
userRouter.get('/index',Users.index);
userRouter.get('/:id', Users.show);

const quizRouter = express.Router();
router.use('/quizes', quizRouter);
quizRouter.post('/create',Quizes.create);
//quizRouter.get('/index', Quiz.index);
quizRouter.get('/:id', Quizes.show);

const tokenRouter = express.Router();
router.use('/tokens', tokenRouter);
tokenRouter.get('/new', Token.new);
tokenRouter.post('/create', Token.create);



module.exports = router;
