const knex = require('../db');
const Promise = require('bluebird');

const Quiz = {

  createGenerate(req,res){
    // console.log('data from react; ');
    // console.log('req.currentUser:', req.currentUser);
    // console.log('req.body:', req.body);
    const userId = req.currentUser.id;
    const expression_count = req.body.numberOfExpressions;
    const difficulty = req.body.difficulty;
    const operator = req.body.arithmeticOperator;
    const _data = {
      user_id: userId,
      date: new Date(),
      source: "generated",
      expression_count: expression_count,
      repeated: 0,
      right_answer_count: 0
    };

    function randomizer(arr,n){
      let finalArr = [];
      let random;
      do{
        random = arr[Math.floor((Math.random()*arr.length))];
        if(!finalArr.includes(random)){
        finalArr.push(random);}
      }
      while(finalArr.length < n)
      return finalArr;
    }

    return knex('quizes')
      //.into('quizes')
      .insert(_data)
      .returning('*')
      .then( quizData => {
        const quiz = quizData[0];

        knex
          .select('id')
          .from('expressions')
          .where('operator',operator)
          .where('difficulty', difficulty)
          .then( expArray => {
            const expressions = randomizer(expArray,expression_count);
            // console.log('expressions:', expressions);
            let answer = {};
            expressions.forEach(expression => {
              answer = {
                expression_id: expression.id,
                quiz_id: quiz.id,
                correct_answer: false
              }
              return knex('answers')
                  .insert(answer)
                  .returning('*')
                  .then( answer => {
                    // console.log('answer from db',answer);
                    res.json(quiz);
                  })
            })
          })
      })
  },

  createFromCustomQuiz(req, res) {
    const userId = req.currentUser.id;
    const customQuizId = req.body.customQuizId;
    // console.log('req.body:', req.body);
    const _data = {
      user_id: userId,
      date: new Date(),
      source: "custom",
      repeated: 0,
      right_answer_count: 0
    };

    knex('custom_quizes')
      .first()
      .where('id', customQuizId)
      .then( customQuiz => {
        console.log('customQuiz:', customQuiz);
        _data.expression_count = customQuiz.number_of_expressions;
        console.log('_data:', _data);

        knex('quizes')
          .insert(_data)
          .returning('*')
          .then( quizData => {
            const quiz = quizData[0];
            // console.log('quiz:', quiz);
            knex('custom_expressions')
              .select('id')
              .where('custom_quiz_id',customQuizId)
              .then( customExpressions => {
                console.log('customExpresions:', customExpressions);
                const promiseArray = [];
                let answer = {};

                for(let expression of customExpressions){
                  promiseArray.push(new Promise(function(resolve) {
                    answer = {
                              custom_expression_id: expression.id,
                              quiz_id: quiz.id,
                              correct_answer: false
                              }
                    knex('answers')
                      .insert(answer)
                      .returning('*')
                      .then( answer => {
                        resolve(answer);
                      })
                  }))
                }
                Promise.each(promiseArray, function(result){
                  console.log('value in Peomise.each:', result);
                })
                .then( () => { res.json(quiz)});
              })
          })
      })
  },

  show(req,res){
    const quizId = req.params.id;
    console.log('req.params:', req.params);
    console.log('quizId', quizId);
    //const userId = req.currentUser.id;

        knex('quizes')
          .first()
          .where('id', quizId)
          .then( quiz => {
            console.log('quiz:', quiz);

            if(quiz.source === "generated"){
              knex('expressions')
                .join('answers','expressions.id','=','answers.expression_id')
                .select('expressions.operator','expressions.num1', 'expressions.num2',
                        'expressions.solution', 'expression_id','expressions.difficulty',
                        'answers.id','correct_answer')
                .where('quiz_id', quizId)
                .then( expressions => {
                  quiz.expressions = expressions;
                  res.json(quiz);
                })
            }
            else {
              knex('custom_expressions')
                .join('answers','custom_expressions.id', '=', 'answers.custom_expression_id')
                .select('custom_expressions.expression','custom_expressions.solution',
                        'custom_expression_id','answers.id', 'correct_answer')
                .where('quiz_id', quizId)
                .then( customExpressions => {
                  quiz.expressions = customExpressions;
                  // console.log('customExpressions:', customExpressions);
                  console.log('quiz', quiz);
                  res.json(quiz);
                })
            }
          })
  },

  update(req, res){
    const right_answer_count = req.body.right_answer;
    const seconds = req.body.time;
    const quiz_id = req.body.quiz_id;
    const repeated = req.body.repeated;

    function formatSeconds (sec) {
      let date = new Date(1970,0,1);
      date.setSeconds(sec);
      return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }
    const time = formatSeconds(seconds);

    return knex('quizes')
      .where('id', quiz_id)
      .update({
        right_answer_count: right_answer_count,
        time: time,
        repeated: repeated
      })
      .returning('*')
      .then( quizData => {
        const quiz = quizData[0];
        //console.log('right answer count updated!', quiz);
        res.json(quiz);
       })
  },

  correct(req,res){
    const quizId = req.params.id;

    knex('quizes')
      .select('source')
      .where('id', quizId)
      .then( quizData => {
        const quiz = quizData[0];

        if(quiz.source === "generated"){
          knex('answers')
            .join('expressions','expressions.id','=','answers.expression_id')
            .select('expressions.operator','expressions.num1', 'expressions.num2',
                    'expressions.solution', 'expression_id', 'answers.id','answers.correct_answer','answers.quiz_id')
            .where({
              quiz_id: quizId,
              correct_answer: false
            })
            .then( expressions => {
              // console.log('expressions: ', expressions);
              res.json(expressions);
            })
        }
        else {
          knex('answers')
            .join('custom_expressions','custom_expressions.id','=','answers.custom_expression_id')
            .select('custom_expressions.expression','custom_expressions.solution',
                    'custom_expression_id', 'answers.id','answers.correct_answer','answers.quiz_id')
            .where({
              quiz_id: quizId,
              correct_answer: false
            })
            .then( expressions => {
              console.log('expressions: ', expressions);
              res.json(expressions);
            })
        }
      })

  },

  index(req, res){
    // console.log('in quizes index')

    const childId = req.params.childId;
    const userId = req.currentUser.id;
    const childInfo = {};

    knex('current_quiz_set_ups')
      .first('parent_id','custom_quiz_id')
      .where('child_id', childId)
      .then( quizSetUp => {
        // console.log('quizSetUp:', quizSetUp);
        const parentId = quizSetUp.parent_id;
        const customQuizId = quizSetUp.custom_quiz_id;

        if(parentId === userId){
          knex('quizes')
            .select('*')
            .where('user_id', childId)
            .then( quizes => {
              childInfo.quizes = quizes;
              if(customQuizId !== null){
                knex('custom_quizes')
                  .first('*')
                  .where('id', customQuizId)
                  .then( customQuiz => {
                    childInfo.customQuiz = customQuiz;
                    res.json(childInfo);
                  })
              }
              else {
                childInfo.customQuiz = null;
                res.json(childInfo);
              }
            })
        }
        else {
          res.status(401).send('Authorization failed!');
        }
      })
  }

}
module.exports = Quiz;

// createFromCustomQuiz(req, res) {
//   const userId = req.currentUser.id;
//   const customQuizId = req.body.customQuizId;
//   // console.log('req.body:', req.body);
//   const _data = {
//     user_id: userId,
//     date: new Date(),
//     source: "custom",
//     repeated: 0,
//     right_answer_count: 0
//   };
//
//   knex('custom_quizes')
//     .first()
//     .where('id', customQuizId)
//     .then( customQuiz => {
//       console.log('customQuiz:', customQuiz);
//       _data.expression_count = customQuiz.number_of_expressions;
//       // console.log('_data:', _data);
//
//       knex('quizes')
//         .insert(_data)
//         .returning('*')
//         .then( quizData => {
//           const quiz = quizData[0];
//
//           knex
//             .select('id')
//             .from('custom_expressions')
//             .where('custom_quiz_id',customQuizId)
//             .then( customExpressions => {
//               let answer = {};
//               customExpressions.forEach(expression => {
//                 answer = {
//                   custom_expression_id: expression.id,
//                   quiz_id: quiz.id,
//                   correct_answer: false
//                 }
//                  knex('answers')
//                     .insert(answer)
//                     .returning('*')
//                     .then( answer => {
//                       // console.log('answer from db',answer);
//                       console.log('quiz to react:', quiz);
//                       res.json(quiz);
//                     })
//               })
//             })
//         })
//     })
// },
