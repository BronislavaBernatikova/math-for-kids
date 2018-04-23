const knex = require('../db');

const CustomQuizes = {

  create(req, res){
    // console.log('req in create:',req);
    const title = req.body.title;
    const userId = req.currentUser.id;

    return knex('custom_quizes')
            .insert({
              'title' : title,
              'user_id': userId
            })
            .returning('*')
            .then( customQuizData => {
              const customQuiz = customQuizData[0];
              res.json(customQuiz);
            })
  },

  update(req, res){

    const customQuizId = req.body.customQuizId;
    const title = req.body.title;
    const userId = req.currentUser.id;

    return knex('custom_quizes')
            .where({
              id: customQuizId,
              user_id: userId
            })
            .update({
              title: title
            })
            .returning('*')
            .then( customQuizData => {
              const customQuiz = customQuizData[0];
              res.json(customQuiz);
            })
  },

  delete(req,res){

    const customQuizId = req.params.id;
    const userId = req.currentUser.id;

    knex('custom_quizes')
      .where({ id: customQuizId,
               user_id: userId
            })
      .del()
      .then(res.status(200).send('Custome quiz was successfully deleted!'))
  },

  index(req,res){

    const userId = req.currentUser.id;

    knex('custom_quizes')
      .select('*')
      .then( quizData => {
        res.json(quizData)
      })
  }
}


module.exports = CustomQuizes;
