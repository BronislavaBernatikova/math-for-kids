const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const saltRounds = 10;
const moment = require('moment');
//const app = express();

const Tokens = {

  // new(req, res){
  //   res.render('signIn', {errors: {}});
  // },

  create(req,res){
    const email = req.body.email;
    const logInPassword = req.body.password;
     console.log('logInPassword :', logInPassword );
    knex
    .select()
    .from('users')
    .where('email', email)
    .then( userData => {
      let user = userData[0];
      //console.log('logInPassword :', logInPassword );
      //console.log('userPassword :', user.password_digest );
      bcrypt.compare(logInPassword, user.password_digest, function(err,result){
        if (result === true){
          // console.log('passed bcrypt')
          //console.log('secretToken', process.env.MATH_FOR_KIDS_SECRET_KEY)
          const expires = moment().add(7, 'days').valueOf();
          const token = jwt.encode(
                      {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        exp: expires
                      },
                      process.env.MATH_FOR_KIDS_SECRET_KEY);
//The res.json() method is used to return a JSON representation of the token to the
// client.
          res.json({
                    token : token,
                    expires: expires,
                    user_id: user.id
                  //user: user.toJSON()// i dont need to send user!!
                  });
        }
      })
    })
  }
}
module.exports = Tokens;
