const knex = require('../db');

const CurrentQuizSetUps = {

  update(req,res){
    const parentId = req.currentUser.id;
    // const childId = req.body.childId; not needed as every child has only one setupquiz so id is unique
    const setUpId = req.body.setUpId;
    const customQuizId = req.body.customQuizId;
    const difficulty = req.body.difficulty;
    const numberOfExpressions = req.body.numberOfExpressions;
    const operator = req.body.operator;
    let data = { custom_quiz_id: null,
                   difficulty: null,
                   number_of_expressions: null,
                   operator: null
                  }

    customQuizId ? (   data = { custom_quiz_id: customQuizId,
                               difficulty: null,
                               number_of_expressions: null,
                               operator: null
                             }
                ) : (  data = { custom_quiz_id: null,
                               difficulty: difficulty,
                               number_of_expressions: numberOfExpressions,
                               operator: operator
                              })
    return knex('current_quiz_set_ups')
            .where('id', setUpId)
            .update(data)
            .returning('*')
            .then( setUpData => {
              const currentQuizSetUp = setUpData[0];
              res.json(currentQuizSetUp);
            })

  },

  index(req,res){

    const userId = req.currentUser.id;

    knex('current_quiz_set_ups')
      .where('parent_id', userId)
      .select('*')
      .then( allSetUpData => {
        res.json(allSetUpData);
      })

  }
}
module.exports = CurrentQuizSetUps;
