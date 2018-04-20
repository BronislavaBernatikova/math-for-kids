const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');
//const Expressions = require('../controllers/expressions');
const Users = require('../controllers/users_controller');
const Quizes = require('../controllers/quizes_controller');
const Token = require('../controllers/token_controller');
const Answers = require('../controllers/answers_controller');

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
userRouter.post('/create/parent', Users.createParentUser);
userRouter.post('/create/child', Users.createChildUser);
userRouter.get('/index',Users.index);
userRouter.get('/:id', Users.show);

const quizRouter = express.Router();
router.use('/quizes', quizRouter);
quizRouter.post('/create',Quizes.create);
quizRouter.post('/update', Quizes.update);
quizRouter.get('/show/:id', Quizes.show);
quizRouter.get('/correct/:id', Quizes.correct);


const answerRouter = express.Router();
router.use('/answers', answerRouter);
answerRouter.post('/create', Answers.create);
answerRouter.post('/update', Answers.update);

const tokenRouter = express.Router();
router.use('/tokens', tokenRouter);
tokenRouter.get('/new', Token.new);
tokenRouter.post('/create', Token.create);

const



module.exports = router;
