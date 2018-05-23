const knex = require('../db');


const CurrentQuizSetUps = {

  update(req,res){

    const userId = req.currentUser.id;
    const setUpId = req.body.currentQuizId;
    const {customQuizId, difficulty, numberOfExpressions} = req.body;
    const operator = req.body.arithmeticOperator;

    if(!setUpId){
      res.json({
        error: "Invalid data" // 'id' for which quiz (child) we want to set up new settings is missing
      })
    }
    else if((operator && difficulty && numberOfExpressions) || customQuizId) {

      let data = {}

      if(customQuizId === null ){
          data = { custom_quiz_id: null,
                   difficulty: difficulty,
                   number_of_expressions: numberOfExpressions,
                   operator: operator
                  }
      }
      else {
          data = { custom_quiz_id: customQuizId,
                   difficulty: null,
                   number_of_expressions: null,
                   operator: null
                 }
      }
      console.log('datax:',data);

      knex('current_quiz_set_ups')
        .where({
          id: setUpId,
          parent_id: userId
        })
        .update(data)
        .returning('*')
        .then( updatedData => {
          const updatedQuizSetUp = updatedData[0];

          res.json(updatedQuizSetUp);
        })
    }
    else {
      res.json({
        error: "Invalid data" // settings for generated quiz are invalid of 'id' of custom quiz is missing
      })
    }
  },

  index(req,res){

    const userId = req.currentUser.id;

    knex('current_quiz_set_ups')
      .where('parent_id', userId)
      .select('*')
      .then( allSetUpData => {
        res.json(allSetUpData); // returning array
      })

  },

  show(req,res){

    const setUpId = req.params.id;

    knex
      .first()
      .from('current_quiz_set_ups')
      .where('id', setUpId)
      .then( currentQuizdata => { // returning object
        res.json(currentQuizdata);
      })
  }
}
module.exports = CurrentQuizSetUps;
