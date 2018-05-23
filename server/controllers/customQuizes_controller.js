const knex = require('../db');
const Promise = require('bluebird');

function hasEmptyProp (object){
  for(let property in object){
    if(!object[property]) {
      return true;
    }
  }
  return false;
}
function hasEmptyObject (array){
  for(let item of array){
    if(hasEmptyProp(item)) {
      return true;
    }
  }
  return false;
}


const CustomQuizes = {

    create(req, res){

    const title = req.body.title;
    const customExpressions = req.body.customExpressions;
    const numberOfExpressions = customExpressions.length;
    const userId = req.currentUser.id;

    // title of custom quiz is missing or there is no expression in the quiz
    if(!title || numberOfExpressions === 0){
      res.json({
        error: "Invalid data"
      })
    }
    // custom quiz doesn't have any expressions
    else if( hasEmptyObject(customExpressions)){
      console.log('no custom expressions');
      res.json({
        error: "Invalid data"
      })
    }
    else {

        knex('custom_quizes')
            .insert({
              'title' : title,
              'user_id': userId,
              'number_of_expressions': numberOfExpressions
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
                                    .then( expressionArr => {
                                      const expression = expressionArr[0];
                                      // console.log('value in the loop:', value);
                                      resolve(expression);
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
            res.json(customQuiz);
            })
    }
            // .then( value => {
            //   res.json(value);
            //   // console.log('End of promis:', value);
            // })
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

    knex('custom_expressions')
      .where({ id: customQuizId,
               user_id: userId
            })
      .del()
      .then(
        knex('custom_quizes')
          .where({ id: customQuizId,
                   user_id: userId
                })
          .del()
          .then(res.status(200).send('Custome quiz was successfully deleted!'))
      )
  },

  index(req,res){

    const userId = req.currentUser.id;

    knex('custom_quizes')
      .select('*')
      .then( quizData => {
        res.json(quizData)
      })
  },

  show(req,res){
    const customQuizId = req.params.id;
    const userId = req.currentUser.id;

    knex('custom_quizes')
      .first()
      .where({
        id: customQuizId,
        user_id: userId
      })
      .then( customQuiz => {

        knex('custom_expressions')
          .select('*')
          .where('custom_quiz_id', customQuizId)
          .then( customExpressions => {
            customQuiz.customExpressions = customExpressions;
            res.json(customQuiz);
          })
      })
  }
}


module.exports = CustomQuizes;
// .onDelete('CASCADE');

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
