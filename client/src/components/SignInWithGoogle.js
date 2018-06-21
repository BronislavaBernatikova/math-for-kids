import React, { Component } from 'react';
import { Google } from '../lib/requests';
import { GoogleKeys } from '../keys.js';

class SignInWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.initAuth2 = this.initAuth2.bind(this); //Event handlers binding
    this.auth2x = null; //Reference to auth2 object
  }

  initAuth2() {
    const app = window.app;
    const {onGoogleSignIn = () => {} } = this.props;

    app.gapiPromise.then( gapi => {
      // window.app = window.app || {};
      // window.app.gapi = gapi;
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        // gapi.auth2.init() --> initializes the GoogleAuth object.
        // You must call this method before calling gapi.auth2.GoogleAuth's methods!!
      gapi.auth2.init({
          client_id: GoogleKeys.GOOGLE_CLIENT_ID,
          scope: 'profile'
        })
        .then( auth2 => {
          this.auth2x = auth2;
          // GoogleAuth --> is a singleton class that provides methods to allow the user
          // to sign in with a Google account, get the user's current sign-in status,
          // get specific data from the user's Google profile, request additional
          // scopes, and sign out from the current account.

          // A singleton --> is a class that allows only a single instance of itself to be created and
          // gives access to that created instance. It contains static variables that can accommodate
          // unique and private instances of itself. It is used in scenarios when a user wants to
          // restrict instantiation of a class to only one object. This is helpful usually when a
          // single object is required to coordinate actions across a system.
          this.auth2x.signIn()
          // GoogleAuth.signIn() --> signs in the user with the options specified to gapi.auth2.init()
          // and returns a Promise that is fulfilled with the GoogleUser instance when the user
          // successfully authenticates
          .then(function(data){

            // data-->
            // We {
            //    El: "999999999999999999999",
            //    Zi: {
            //         access token:              "yyyy.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxx"
            //         expires_at:                 999999999999
            //         expires_in:                 9999
            //         first_issued_at:            999999999999
            //         id_token:
            //         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkZGY1NGQzMDMyZDFmMGQ0OGMzNjE4ODky.
            //         eyJhenAiOiI5Nzc4NTIwNzk3MTMtNGdtYjY5a3JsbDlmNGt1aXB2cXU3bjQwaDk5Zj
            //         c2VyY29udGVudC5jb20iLCJhdWQiOiI5Nzc4NTIwNzk3MTMtNGdtYjY5a3JsbDlmNGt
            //         ZjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI0OTk3MzIxMTk
            //         YXNoIjoiRXpsdjhnemoybjR6cEZRyODgzMTgxMCwiaXNzIjoiYWNjb3VudHMuZ29v
            //         Z2xlLmNvbSIsImp0aSI6IjNiOTJiNWMzMDI5NTk0MGZkMDg1YTYxMDdkODJkOGUxM2U2
            //         Mjg4MjgyMTB9.HcXxC3AgrTcM_lL4GaJvGeO_SI-rXgKXq9Qd4VS2SwoHwVYj_9CgWNO
            //         KtGi278loHqg8kqXiSY9Ghi8vgrbJeYoq23lWvO_w4vlxEOxyGtirhB8uyna6L2xfa8l
            //         St0DbXjwakh9L9u28pf1kLWyCxuChJ0sbDDk_oJsgmQKxjj1o1Bp7skg3vvfF9NBLAqud
            //         u8ClE38TZKi4xoMj40FQiE2HlNahUNCGNMTErW7piuyR8A9--9MthPr7DRHzZGqHzett"
            //         idpId:                     "google"
            //         login_hint:                "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxx"
            //         scope:                     "https://www.googleapis.com/auth/userinfo.profile profile"
            //         session_state:             {extraQueryParams: {…}}
            //         token_type:                "Bearer"
            //        }
            //    w3: PG {
            //            Eea: "99999999999999999999",
            //            Paa: "https://lh6.googleusercontent.com/.../.../.../.../photo.jpg",
            //             U3:  "test@gmail.com",
            //             ig: "TestFirst TestLast",
            //            ofa: "TestFirst", wea: "TestLast",
            //            wea: "TestLast"
            //            }

              const idToken = data.getAuthResponse().id_token;
              const tokenData = {
                id_token: idToken
              }
              Google
                .verify(tokenData)
                .then( user => {
                  localStorage.setItem('jwt', user.token);
                  localStorage.setItem('userId', user.user_id);
                    onGoogleSignIn()
                    // this.props.history.push('/'); --> React router only injects the routing props to the
                    // component it routed to, but not to the components nested with in. For that reason we
                    // can't use "this.props.history.push()", the fact that the component SignInWithGoogle
                    // is nested one further is an issue.
                    // We could use Redux for this problem next time: -->
                    // export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ChildView))
                })
          })
          .catch((y) => {console.log("no", y)})
        })
      });
    });
    // console.log('window.app.gapiPromise:', window.app.gapiPromise);
  }

  render() {
      return (
        <div className="signInWithGoogle">
          <button className="signInWithGoogleButton"
                  onClick={this.initAuth2}
          >Sign In With Google
          </button>
        </div>
      )}
}
export default SignInWithGoogle;
