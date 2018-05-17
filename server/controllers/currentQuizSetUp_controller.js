const knex = require('../db');


const CurrentQuizSetUps = {

  update(req,res){

    const userId = req.currentUser.id;
    const setUpId = req.body.currentQuizId;
    const customQuizId = req.body.customQuizId;
    console.log('customQuizId:', customQuizId);
    const difficulty = req.body.difficulty;
    const numberOfExpressions = req.body.numberOfExpressions;
    const operator = req.body.arithmeticOperator;
    let data = {}
                // console.log('data:',data)
                // console.log('setUpId:', setUpId);
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
        console.log('updatedQuizSetUp:', updatedQuizSetUp);
        res.json(updatedQuizSetUp);
      })
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
