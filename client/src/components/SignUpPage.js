import React from 'react';
import { User } from '../lib/requests';

function SignUpPage(props) {
  const { onSignUp = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    User
      .create({
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUpPage;
