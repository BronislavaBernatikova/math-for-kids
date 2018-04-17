import React, { Component } from 'react';
import { Token } from '../lib/requests';
import '../styling/SignIn.css'

class SignInPage extends Component {
  constructor (props) {
    super(props);
    this.createToken = this.createToken.bind(this);
  }

  createToken(event) {
    event.preventDefault();

    const {onSignIn = () => {} } = this.props;
    const formData = new FormData(event.currentTarget);

    Token
      .create({
        email: formData.get('email'),
        password: formData.get('password')
      })
      .then( data => {
        if(!data.error) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('userId', data.user_id);
          onSignIn()
          this.props.history.push('/');
        }
      })
  }

  render() {
    return(
      <main className="SignInPage">
        <div className="wrapper">
          <div className="bgi-2">
            <form onSubmit={this.createToken}>
              <div className="signInContainer-1">
                <label htmlFor='email'>Email</label> <br />
                <input type='email' id='email' name='email'/>
              </div>

              <div className="signInContainer-1">
                <label htmlFor='password'>Password</label> <br />
                <input type='password' id='password' name='password' />
              </div>

              <div className="signInContainer-2">
                <input type='submit' value='Sign In'/>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default SignInPage;
