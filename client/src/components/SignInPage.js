import React, { Component } from 'react';
import { Token } from '../lib/requests';
import '../styling/SignInUp.css'

class SignInPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalState: false,
      canSeeTheForm: true
    }
    this.createToken = this.createToken.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event){
    event.preventDefault();
    this.setState({
      modalState: false,
      canSeeTheForm: true
    })
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
          console.log('ok');
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('userId', data.user_id);
          onSignIn()
          this.props.history.push('/');
        }
        else {
          this.setState({
            modalState: true,
            canSeeTheForm: false
          })
        }
      })
  }

  render() {
    return(
      <main className="SignInUpPage">
        <div className="wrapper">
          <div className="bgi-2">
            <div className="wrapperDimm">

            <form onSubmit={this.createToken}
                  style={{display: this.state.canSeeTheForm ? 'block' : 'none' }}>
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

            <div className="modal" id="modal" style={{display: this.state.modalState ? 'table' : 'none' }}>
              <div className="modal__dialog">
                <section className="modal__content">
                  <header className="modal__header">
                    <div className="modal__title">Ups, invalid login! Please, try again..</div>
                    <button className="modal__close"
                            onClick={this.closeModal}
                    >x</button>
                  </header>
                </section>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
    )
  }
}

export default SignInPage;
