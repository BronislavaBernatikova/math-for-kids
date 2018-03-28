const knex = require('../db');

const Quiz = {

  create(req,res){

    console.log('data from react; ');
    const userId = req.currentUser;
    const expression_count = req.body.numberOfExpressions;
    const difficulty = parseInt(req.body.difficulty);
    const type = parseInt(req.body.arithmeticOperator);

    return knex('quizes')
      .insert({
        userId: userId,
        date: Date.now,
        expression_count: expression_count,
        difficulty: difficulty,
        type: type
      })
      .returning('*')
      .then( quizData => {
        const quiz = quizData[0];
        res.json(quiz);

        // knex
        //   .select('*')
        //   .from('expressions')
        //   .where(function() {
        //     this.where('type', type).andWhere('difficulty', difficulty)
        //     })
        //   // .where('type',type)
        //   // .where('difficulty', difficulty)
        //   .limit('numberOfExpressions',expression_count)
        //   .then(expressions => {
        //     quiz.expressions = expressions;
        //     res.json(quiz);
        //   })
        //   .catch()
      });
  }
}
//Promise.all
module.exports = Quiz;

// .where('userId', userId)
// .orderBy('id', 'desc')
// .then( quizData => {
//   //const lastQuiz = quizData.slice(-1);
//   res.render('userPage',{quizData});
// })
