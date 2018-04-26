const knex = require('../db');

// function arrayToDb (array){
//   console.log(array);
//   for (let item of array) {
//     return new Promise((resolve,reject) => {
//       knex('custom_expressions')
//         .insert({
//           custom_quiz_id: customQuizId,
//           user_id: userId,
//           expression: item.expression,
//           solution: item.solution
//         })
//         .then( value => {
//           console.log(value);
//           value ? resolve(value) : reject('something went wrong');
//         })
//     })
//   }
// }

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

              // const returnArray = (cqId,uId,array) => {
              function returnArray (cqId, uId, aaray){
                return new Promise((resolve, reject) => {
                  let valueArray = [];
                      for ( let item of customExpressions) {

                          knex('custom_expressions')
                            .insert({
                              custom_quiz_id: cqId,
                              user_id: uId,
                              expression: item.expression,
                              solution: item.solution
                            })
                            .returning('*')
                            .then( value => {
                              // console.log('exp.value: ',value);
                              valueArray.push(value);
                              console.log('valueArrayX:', valueArray);
                              if(valueArray.length === numberOfExpressions){
                                console.log('valueArrayY:', valueArray);
                                  resolve(valueArray);
                              }
                            })
                        }
                        console.log('valueArrayZ:', valueArray);
                    // if(valueArray.length === numberOfExpressions){
                    //   console.log('valueArray:', valueArray);
                    //     resolve(valueArray);
                    // }
                })
              }
               return returnArray(customQuizId,userId,customExpressions);
              })
              .then(value => console.log('vse v db:', value));
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
//   // console.log('req in create:',req);
//   const title = req.body.title;
//   const customExpressions = req.body.customExpressions;
//   const userId = req.currentUser.id;
//
//   return knex('custom_quizes')
//           .insert({
//             'title' : title,
//             'user_id': userId
//           })
//           .returning('*')
//           .then( customQuizData => {
//             const customQuiz = customQuizData[0];
//             const customQuizId = customQuiz.id;
//             console.log('customQuizId:', customQuizId);
//
//             new Promise((resolve,reject) => {
//               let idArray = [];
//               for (let item of customExpressions) {
//                  new Promise((resolve,reject) => {
//                   knex('custom_expressions')
//                     .insert({
//                       custom_quiz_id: customQuizId,
//                       user_id: userId,
//                       expression: item.expression,
//                       solution: item.solution
//                     })
//                     .returning('*')
//                     .then( value => {
//                       console.log('exp.value1: ',value);
//                       idArray.push(value);
//                     })
//
//                 })
//                } resolve('Expressions are succesfily in db!');
//             })
//           })
//           .then( ()=> {console.log('custom expressions are in db')})
//
// },


// create(req, res){
//   // console.log('req in create:',req);
//   const title = req.body.title;
//   const customExpressions = req.body.customExpressions;
//   const userId = req.currentUser.id;
//
//       knex('custom_quizes')
//           .insert({
//             'title' : title,
//             'user_id': userId
//           })
//           .returning('*')
//           .then( customQuizData => {
//             const customQuiz = customQuizData[0];
//             const customQuizId = customQuiz.id;
//             console.log('customQuizId:', customQuizId);
//
//             function returnArray(cqId,uId,array){
//               return new Promise((resolve, reject) => {
//                 let valueArray = [];
//                     for (let item of array) {
//
//                         knex('custom_expressions')
//                           .insert({
//                             custom_quiz_id: cqId,
//                             user_id: uId,
//                             expression: item.expression,
//                             solution: item.solution
//                           })
//                           .returning('*')
//                           .then( value => {
//                             console.log('exp.value1: ',value);
//                             valueArray.push(value);
//                           })
//                       }
//                       resolve(valueArray);
//               })
//             }
//             return returnArray(customQuizId,userId,customExpressions);
//             })
//             .then( value => {
//               console.log('value nakonec:', value);
//             })
//
//
//
// },
