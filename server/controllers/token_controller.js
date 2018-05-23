const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const saltRounds = 10;
const moment = require('moment');

const Tokens = {

  create(req,res){
    const email = req.body.email;
    const logInPassword = req.body.password;

    knex
    .select()
    .from('users')
    .where('email', email)
    .then( userData => {

      if(userData.length !== 0){
        let user = userData[0];

        bcrypt.compare(logInPassword, user.password_digest, function(err,result){
          if (result === true){
            const expires = moment().add(7, 'days').valueOf();
            const token = jwt.encode(
                        {
                          id: user.id,
                          first_name: user.first_name,
                          last_name: user.last_name,
                          exp: expires,
                          role: user.role
                        },
                        process.env.MATH_FOR_KIDS_SECRET_KEY);
  //The res.json() method is used to return a JSON representation of the token to the
  // client.
            res.json({
                      token : token,
                      expires: expires,
                      user_id: user.id // I don't need to send user_id as it is in token ( just have to decode it in client)
                    });
          }
          else{
            // error: 'Wrong password'
            res.json({
              error: 'Invalid login.'
            });
          }
        })
      }
      else {
        // error: `User doesn't exist.`
        res.json({
          error: 'Invalid login.'
        });
      }
    })
  }
}
module.exports = Tokens;
