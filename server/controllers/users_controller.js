const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const saltRounds = 10;

const Users = {

  createChildUser(req, res){
    const parentId = req.currentUser.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const passConfirm = req.body.password_confirmation;

    if (password !== passConfirm) {
      res.redirect('/welcome');
    }

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
      return knex('users')
        .insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password_digest: hash,
          role: 'child'
        })
        .returning('*')
        .then( userData => {
          const user = userData[0];
          const childId = user.id;

          knex('current_quiz_set_ups')
           .insert({
             parent_id: parentId,
             child_id: childId
           })
           .then( res.json(user))
        })
    })
    //As childUser can be created only through parent account
    //it is not needed to sent jwt token back to front end.
    //Current signed-in user is a parent who is creating a child.
  },

  createParentUser(req, res){
    console.log('in createParentUser');
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const passConfirm = req.body.password_confirmation;

    if (password !== passConfirm) {
      res.redirect('/welcome');
    }

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
      return knex('users')
        //.into('users')
        .insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password_digest:hash,
          role: 'parent'
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
                      // console.log('token in user: ', token);
                      //The res.json() method is used to return a JSON representation
                      // of the token to the client.
          res.json({
                    token : token,
                    expires: expires,
                    user_id: user.id
                  //user: user.toJSON()// i dont need to send user!!
                  });
        })
    })
  },

  index(req,res){

    knex('users')
      .select('*')
      .then(users => res.json(users));
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
          .where('user_id', userId)
          .orderBy('id', 'desc')
          .then( quizes => {
            user.quizes = quizes;
            res.json(user);
          })
      })

  }

}

module.exports = Users;
// route for user signup
// new(req, res){
//   res.render('signUp', {errors: {}});
// },

//   res.send(JSON.stringify({
// error: true,
// message
  //.then( res.json())
