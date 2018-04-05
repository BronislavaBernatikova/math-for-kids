const knex = require('../db');

const Quiz = {

  create(req,res){
    console.log('data from react; ');
    console.log('req.currentUser:', req.currentUser);
    console.log('req.body:', req.body);
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
          .limit(expression_count)
          .then( expressions => {
            quiz.expressions = expressions;
            res.json(quiz);
          })
      })
  },

  show(req,res){
    const quizId = req.params.id;
    //const userId = req.currentUser.id;

        knex('quizes')
          .first()
          .where('id', quizId)
          .then( quiz => {

            knex('expressions')
              .join('answers','expressions.id','=','answers.expression_id')
              .select('expressions.operator','expressions.num1', 'expressions.num2',
                      'expressions.solution', 'expression_id','expressions.difficulty',
                      'answers.id','correct_answer')
              .where('quiz_id', quizId)
              .then( expressions => {
                quiz.expressions = expressions;

                res.json(quiz);
              })
          })
  },

  update(req, res){
    const right_answer_count = req.body.right_answer;
    const seconds = req.body.time;
    const quiz_id = req.body.quiz_id;

    function formatSeconds (sec) {
      let date = new Date(1970,0,1);
      date.setSeconds(sec);
      return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }

    const time = formatSeconds(seconds);
    // console.log('time from request', seconds);
    // console.log('time after function:', time);

    return knex('quizes')
      .where('id', quiz_id)
      .update({
        right_answer_count: right_answer_count,
        time: time
      })
      .returning('*')
      .then( quizData => {
        const quiz = quizData[0];
        console.log('right answer count updated!');
        res.json(quiz);
      })
  }

}
module.exports = Quiz;
