const knex = require('../db');

const Answer = {

  update(req,res){
    const correct_answer = req.body.correct_answer;
    const answer_id = req.body.answer_id;

    return knex('answers')
      .where('id', answer_id)
      .update({
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
