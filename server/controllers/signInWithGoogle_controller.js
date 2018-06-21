//https://developers.google.com/identity/sign-in/web/backend-auth

const knex = require('../db');
const jwt = require('jwt-simple');
const moment = require('moment');
const {OAuth2Client} = require('google-auth-library');


const GoogleUsers = {

  verifyIdToken(req,res){
    const token = req.body.id_token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      const email = payload['email'];
      const first_name = payload['given_name'];
      const last_name = payload['family_name'];
      // console.log('payload:', payload);

      if( (payload['aud'] == process.env.GOOGLE_CLIENT_ID)&&
          (payload['iss'] === 'accounts.google.com'|| payload['iss'] === 'https://accounts.google.com')){

          knex('users')
          .select('*')
          .where({ google_id: userid})
          .then( data => {
             //const user = data[0];
            if(data.length === 0){
              console.log('no such user');
              knex('users')
                .insert({
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  google_id: userid,
                  role: 'parent'
                })
                .returning('*')
                .then( userData => {
                  const user = userData[0];
                  console.log('user:', user);
                  const expires = moment().add(7, 'days').valueOf();
                  const token = jwt.encode({
                                  id: user.id,
                                  first_name: user.first_name,
                                  last_name: user.last_name,
                                  exp: expires,
                                  role: user.role
                                },
                                process.env.MATH_FOR_KIDS_SECRET_KEY);
                                console.log('token:', token);
                  res.json({
                            token : token,
                            expires: expires,
                            user_id: user.id // I don't need to send user_id as it is in token ( just have to decode it in client)
                          });
                })
            }
            else {
              console.log('retrieving user from database');
              const user = data[0];
              const expires = moment().add(7, 'days').valueOf();
              const token = jwt.encode({
                              id: user.id,
                              first_name: user.first_name,
                              last_name: user.last_name,
                              exp: expires,
                              role: user.role
                            },
                            process.env.MATH_FOR_KIDS_SECRET_KEY);
                            console.log('token:', token);
              res.json({
                        token : token,
                        expires: expires,
                        user_id: user.id // I don't need to send user_id as it is in token ( just have to decode it in client)
                      });
            }
          })
      }
    }
    verify().catch(console.error);
  }
}
module.exports = GoogleUsers;

//  !!! has to be checked if aud matches my client_ID and if iss matches
// 'accounts.google.com' or 'https://accounts.google.com'
// use sub to store information abou a user.
// payload: {
//   azp:                '........***************',
//   aud:                '.......****************',  --> audience --> YOUR_APPS_CLIENT_ID
//   sub:                '99999999999999999999999', --> google_id
//   email:              'test@gmail.com',
//   email_verified:      true,
//   at_hash:            'xxxxxxxxxxxxxxxxxxxxxxxx',
//   exp:                 999999999,
//   iss:                'accounts.google.com', --> issuer
//   jti:                'xxxxxxxxxxxxxxxxxxxxxxxx',
//   iat:                 999999999,
//   name:               'name',
//   picture:            '***********************',
//   given_name:         'nameFirst',
//   family_name:        'nameLast',
//   locale:             'en'
// }
