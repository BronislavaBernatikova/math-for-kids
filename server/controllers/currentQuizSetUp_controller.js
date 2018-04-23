const knex = require('../db');


const CurrentQuizSetUps = {

  update(req,res){

    const userId = req.currentUser.id;
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
            .returning('*')
            .then( setUpData => {
              const currentQuizSetUp = setUpData[0];
              if(currentQuizSetUp.parent_id === userId){

                return knex('current_quiz_set_ups')
                        .where('id', setUpId)
                        .update(data)
                        .returning('*')
                        .then( updatedData => {
                          const updatedQuizSetUp = updatedData[0];
                          res.json(updatedQuizSetUp);
                        })
              }
              else {
                res.status(401).send('Authorization failed!');
              }
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
