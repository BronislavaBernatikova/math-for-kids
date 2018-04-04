const knex = require('../db');

const Answer = {

  create(req,res){

    const expressionId = req.body.expression_id;
    const quizId = req.body.quiz_id;
    const correct_answer = req.body.correct_answer;

     return knex('answers')
              .insert({
                expression_id: expressionId,
                quiz_id: quizId,
                correct_answer: correct_answer
              })
            .returning('*')
            .then( answerData => {
              const answer = answerData[0];
              res.json(answer);
            })


  }
}

module.exports = Answer;
