import React, { Component } from 'react';
import { Token } from '../lib/requests';

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
        console.log('dataxy: ', data);
        if(!data.error) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('userId', data.user_id);
          onSignIn()
          this.props.history.push('/');
          console.log('history: ',this.props.history);
        }
      })
  }

  render() {
    return(
      <main className="SignInPage">
        <h2>Sign In</h2>
        <form onSubmit={this.createToken}>
          <div>
            <label htmlFor='email'>Email</label> <br />
            <input type='email' id='email' name='email'/>
          </div>

          <div>
            <label htmlFor='password'>Password</label> <br />
            <input type='password' id='password' name='password' />
          </div>

          <div>
            <input type='submit' value='Sign In'/>
          </div>
        </form>
      </main>
    )
  }
}

export default SignInPage;
