import React, { Component } from 'react';
import { Token } from '../lib/requests';
import SignInWithGoogle from './SignInWithGoogle';
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
    this.triggerSignIn = this.triggerSignIn.bind(this);
  }

  triggerSignIn(){
    const { onSignIn = () => {} } = this.props;
    onSignIn();
    this.props.history.push('/');
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

              <div className="googleWrapper">
                <SignInWithGoogle onGoogleSignIn={this.triggerSignIn}/>
                <div className="googleIcon"></div>
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
