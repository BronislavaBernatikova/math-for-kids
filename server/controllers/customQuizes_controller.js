const knex = require('../db');
var Promise = require("bluebird");


const CustomQuizes = {

    create(req, res){
    // console.log('req in create:',req);
    const title = req.body.title;
    const customExpressions = req.body.customExpressions;
    const numberOfExpressions = customExpressions.length;
    console.log('numberOfExpressions:', numberOfExpressions);
    const userId = req.currentUser.id;

        knex('custom_quizes')
            .insert({
              'title' : title,
              'user_id': userId
            })
            .returning('*')
            .then( customQuizData => {
              const customQuiz = customQuizData[0];
              const customQuizId = customQuiz.id;
              console.log('customQuizId:', customQuizId);

              function returnFromDb(cqId,uId,array){
                return new Promise((resolve, reject) => {
                  const promiseArray = [];

                          for ( let item of array) {
                            promiseArray.push(new Promise(function(resolve) {
                              knex('custom_expressions')
                                .insert({
                                  custom_quiz_id: cqId,
                                  user_id: uId,
                                  expression: item.expression,
                                  solution: item.solution
                                })
                                .returning('*')
                                .then( value => {
                                  // console.log('value in the loop:', value);
                                  resolve(value);
                                })
                            }));
                            }
                  Promise.each(promiseArray, function(result){
                    // console.log('value in Peomise.each:', result);
                  })
                  .then( value => { resolve(value);})
                })
              }
            return returnFromDb(customQuizId, userId, customExpressions);
            })
            .then(value => console.log('End of promis:', value));
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

// create(req, res){
// // console.log('req in create:',req);
// const title = req.body.title;
// const customExpressions = req.body.customExpressions;
// const numberOfExpressions = customExpressions.length;
// console.log('numberOfExpressions:', numberOfExpressions);
// const userId = req.currentUser.id;
//
//     knex('custom_quizes')
//         .insert({
//           'title' : title,
//           'user_id': userId
//         })
//         .returning('*')
//         .then( customQuizData => {
//           const customQuiz = customQuizData[0];
//           const customQuizId = customQuiz.id;
//           console.log('customQuizId:', customQuizId);
//
//           // const returnArray = (cqId,uId,array) => {
//           function returnArray (cqId, uId, aaray){
//             return new Promise((resolve, reject) => {
//               let valueArray = [];
//                   for ( let item of customExpressions) {
//
//                       knex('custom_expressions')
//                         .insert({
//                           custom_quiz_id: cqId,
//                           user_id: uId,
//                           expression: item.expression,
//                           solution: item.solution
//                         })
//                         .returning('*')
//                         .then( value => {
//                           // console.log('exp.value: ',value);
//                           valueArray.push(value);
//                           console.log('valueArrayX:', valueArray);
//                           if(valueArray.length === numberOfExpressions){
//                             console.log('valueArrayY:', valueArray);
//                               resolve(valueArray);
//                           }
//                         })
//                     }
//                     console.log('valueArrayZ:', valueArray);
//             })
//           }
//            return returnArray(customQuizId,userId,customExpressions);
//           })
//           .then(value => console.log('vse v db:', value));
// },
//
