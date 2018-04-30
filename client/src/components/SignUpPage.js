import React from 'react';
import { User } from '../lib/requests';
import '../styling/SignInUp.css';

function SignUpPage(props) {
  const { onSignUp = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    User
      .createParentUser({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
      })
      .then( data => {
        console.log('data in signup: ', data);
        if(!data.error){
          const jwt = data.token;
          localStorage.setItem('jwt', jwt);
          onSignUp();
          props.history.push('/');
        }
      });
  }

  return(
    <main className="SignInUpPage">
      <div className="wrapper">
        <div className="bgi-2">
          <div className="wrapperDimm">
            <form onSubmit={handleSubmit}>

              <div className="signInContainer-1">
                <label htmlFor="first_name">First Name</label>
                <input name="first_name" id="first_name" />
              </div>

              <div className="signInContainer-1">
                <label htmlFor="last_name">Last Name</label>
                <input name="last_name" id="last_name" />
              </div>

              <div className="signInContainer-1">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>

              <div className="signInContainer-1">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>

              <div className="signInContainer-1">
                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                />
              </div>

              <div className="signInContainer-2">
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
