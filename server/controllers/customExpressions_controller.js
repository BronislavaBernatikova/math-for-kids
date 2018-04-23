const knex = require('../db');

const CustomExpressions = {

  create(req,res){
    const expression = req.body.expression;
    const customQuizId = req.body.customQuizId;
    const solution = req.body.solution;

    return knex('custom_expressions')
            .insert({
              custom_quiz_id: customQuizId,
              expression: expression,
              solution: solution
            })
            .returning('*')
            .then( customExpressionData => {
              const customExpression = customExpressionData[0];
              res.json(customExpression);
            })

  },

  delete(req,res){
    const customExpressionId = req.params.id;
    const userId = req.currentUser.id;

    knex('custom_expressions')
      .select('*')
      .where({ id: customExpressionId })
      .then( expressionDataArray => {
        const expressionData = expressionDataArray[0];
        
        if(expressionData.user_id === req.currentUser.id){
          knex('custom_expressions')
            .where({ id: customExpressionId })
            .del()
            .then(res.status(200).send('Expression was successfully deleted!'))
        }
        else {
          res.status(401).send('Authorization failed!');
        }
      })
  }
}
module.exports = CustomExpressions;
