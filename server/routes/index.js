const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');
const Users = require('../controllers/users_controller');
const Quizes = require('../controllers/quizes_controller');
const Token = require('../controllers/token_controller');
const Answers = require('../controllers/answers_controller');
const CurrentQuizSetUps = require('../controllers/currentQuizSetUp_controller');
const CustomQuizes = require('../controllers/customQuizes_controller');
const CustomExpressions = require('../controllers/customExpressions_controller');


const authorization = (req, res, next) => {
  if(req.currentUser.role === "parent" ){
    next();
  }
  else {
    res.status(401).send('Authorization failed!');
  }
}

const admin = (req, res, next) => {
  if(req.currentUser.role === "admin" ){
    next();
  }
  else {
    res.status(401).send('Authorization failed!');
  }
}

//managing users
const userRouter = express.Router();
router.use('/users', userRouter);
userRouter.post('/create/parent', Users.createParentUser);
userRouter.post('/create/child', authorization, Users.createChildUser);
userRouter.get('/index',admin, Users.index);
userRouter.get('/:id', Users.show);

//creating token
const tokenRouter = express.Router();
router.use('/tokens', tokenRouter);
tokenRouter.post('/create', Token.create);

//managing quizes
const quizRouter = express.Router();
router.use('/quizes', quizRouter);
quizRouter.post('/create',Quizes.create);
quizRouter.post('/update', Quizes.update);
quizRouter.get('/show/:id', Quizes.show);
quizRouter.get('/correct/:id', Quizes.correct);

//managing answers
const answerRouter = express.Router();
router.use('/answers', answerRouter);
answerRouter.post('/update', Answers.update);
// answerRouter.post('/create', Answers.create); ---> we are creating answers through create quiz now.

//managing current quiz set ups (update/index - only parrent)
const currentQuizSetUpRouter = express.Router();
router.use('/QuizSetUp', currentQuizSetUpRouter);
currentQuizSetUpRouter.post('/update', authorization, CurrentQuizSetUps.update);
currentQuizSetUpRouter.get('/index', authorization, CurrentQuizSetUps.index);
currentQuizSetUpRouter.get('/show/:id', CurrentQuizSetUps.show);
// QuizSetUp "create" action is under "createChildUser" route

//managing custom quizes (only parent)
const customQuizRouter = express.Router();
router.use('/customQuizes', authorization, customQuizRouter);
customQuizRouter.post('/create',  CustomQuizes.create);
customQuizRouter.post('/update', CustomQuizes.update);
customQuizRouter.get('/delete/:id', CustomQuizes.delete);
customQuizRouter.get('/index', CustomQuizes.index);

// managing custom expressions (only parent)
const customExpressionRouter = express.Router();
router.use('/customExpressions', authorization, customExpressionRouter);
customExpressionRouter.post('/create', CustomExpressions.create);
customExpressionRouter.get('/delete/:id', CustomExpressions.delete);

module.exports = router;
