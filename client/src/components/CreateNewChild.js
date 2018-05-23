import React, {Component} from 'react';

class CreateNewChild extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newUserData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }
    event.target.reset();
    this.props.onSubmit(newUserData);
  }

  render(){
    return(
      <main className="CreateNewChild">


              <form onSubmit={this.handleSubmit}>

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
                  <input type="submit" value="Add Student" />
                </div>
              </form>

      </main>
    )
  }
}

export default CreateNewChild;
