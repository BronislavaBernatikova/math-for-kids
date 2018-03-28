const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const saltRounds = 10;

const Users = {
  // route for user signup
  new(req, res){
    res.render('signUp', {errors: {}});
  },

  create(req, res){
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const passConfirm = req.body.password_confirmation;

    if (password !== passConfirm) {
      res.redirect('/welcome');
    }
    // const errors = {};
    // errors.first_name = "must exist"
    //res.render('users', {errors})
    //let user
    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
      return knex('users')
        //.into('users')
        .insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password_digest:hash
        })
        .returning('*')
        .then( userData => {
          //console.log('userDataxx: ', userData);
          let user = userData[0];
          const expires = moment().add(7, 'days').valueOf();
          const token = jwt.encode(
                      {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        exp: expires
                      },
                      process.env.MATH_FOR_KIDS_SECRET_KEY);
                      console.log('token in user: ', token);
//The res.json() method is used to return a JSON representation of the token to the
// client.
          res.json({
                    token : token,
                    expires: expires,
                  //user: user.toJSON()// i dont need to send user!!
                  });
        })
    })
  },

  index(req,res){

    knex('users')
      .select('*')
      .then(users => res.json(users));
    //   res.send(JSON.stringify({
    // error: true,
    // message
      //.then( res.json())
  },

  show(req,res){
    const userId = req.params.id;

    knex
      .first()
      .from('users')
      .where('id', userId)
      .then( user => {
         knex('quizes')
          .select('*')
          .where('userId', userId)
          .then( quizes => {
            user.quizes = quizes;
            res.json(user);
          })
      })

  }

}

module.exports = Users;

// create(req, res){
//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   const email = req.body.email;
//   const password = req.body.password;
//   // const errors = {};
//   // errors.first_name = "must exist"
//   //res.render('users', {errors})
//   bcrypt.hash(password, saltRounds)
//   .then(function(hash) {
//     knex
//     .into('users')
//     .insert({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password_digest:hash
//     })
//     .then( () => {
//       console.log('user: ', user);
//       console.log('user.dataValues: ', user.dataValues);
//       req.session.user = user.dataValues;
//       res.redirect('/expressions/new');
//     })
//     // .catch(error => {
//     //   res.redirect('welcome');
//     // });
//   });
// }

// .then(() => {
//   knex
//   .select()
//   .from('users')
//   .where('password_digest', hash)
//   .then( user => {
//     const dataValues = user[0];
//     console.log('user: ', user);
//     console.log('user.dataValues: ', dataValues);
//     req.session.user = dataValues;
//     res.redirect('/expressions/new');


// .then( userData => {
//   //console.log('userData:',userData)
//   let user = userData[0];
//   console.log('user:',user)
//   if(user) {
//     req.session.userId = user.id
//     res.redirect('/expressions/new');
//   }
//   else {
//     res.redirect('/users/signUp');
//   }
// })
