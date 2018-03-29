const knex = require('../db');

const Quiz = {

  create(req,res){
    console.log('data from react; ');
    const userId = req.currentUser.id;
    const expression_count = req.body.numberOfExpressions;
    const difficulty = req.body.difficulty;
    const operator = req.body.arithmeticOperator;
    const _data = {
      user_id: userId,
      date: new Date(),
      expression_count: expression_count
    };

     return knex('quizes')
      //.into('quizes')
      .insert(_data)
       .returning('*')
       .then( quizData => {
         const quiz = quizData[0];

        knex
          .select('*')
          .from('expressions')
          .where('operator',operator)
          .where('difficulty', difficulty)
          .limit('numberOfExpressions',expression_count)
          .then( expressions => {
            quiz.expressions = expressions;
            res.json(quiz);
          })
      })
  },

  show(req,res){
    const quizId = req.params.id;
    const userId = req.currentUser.id;

    knex
      .first()
      .from('quizes')
      .where('id', quizId)
      .then( quiz => {

        knex('answers')
          .select('*')
          .where('quiz_id', quizId)
          .then( answers => {
            quiz.answers = answers;
            res.json(quiz);
          })
      })
  }
}
//Promise.all
module.exports = Quiz;
