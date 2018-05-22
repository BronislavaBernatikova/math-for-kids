import React, {Component} from 'react';
import { User } from '../lib/requests';
import '../styling/SignInUp.css';

class SignUpPage extends Component {
  constructor(props){
    super()
    this.state = {
      modalState: false,
      canSeeTheForm: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event){
    event.preventDefault();
    this.setState({
      modalState: false,
      canSeeTheForm: true
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const {onSignUp} = this.props;
    const formData = new FormData(event.currentTarget);
    const signUpData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }
    console.log('signUpData:', signUpData);
    console.log('Data was sent to database.');

      User
        .createParentUser(signUpData)
        .then( data => {
          // console.log('data in signup: ', data);
          if(!data.error){
            console.log('New user was successfully sign up.')
            const jwt = data.token;
            localStorage.setItem('jwt', jwt);
            onSignUp();
            this.props.history.push('/');
          }
          else {
            this.setState({
              modalState: true,
              canSeeTheForm:false
            })
          }
        });
  }

  render(){

    return(
      <main className="SignInUpPage">
        <div className="wrapper">
          <div className="bgi-2">
            <div className="wrapperDimm">
              <form onSubmit={this.handleSubmit}
                    style={{display: this.state.canSeeTheForm ? 'block' : 'none' }}>

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

              <div className="modal" id="modal" style={{display: this.state.modalState ? 'table' : 'none' }}>
                <div className="modal__dialog">
                  <section className="modal__content">
                    <header className="modal__header">
                      <div className="modal__title">Ups, invalid sign up!
                      <br/>1. you forgot to fill up some information
                      <br/>2. or email address already exists
                      <br/>3. or your Password and Password Confirmation don't match</div>
                      <div className="modal__title">Please, try again..</div>
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

export default SignUpPage;

// import React, {Component} from 'react';
// import { User } from '../lib/requests';
// import '../styling/SignInUp.css';
//
// function hasEmptyProp (object){
//   for(let property in object){
//     if(!object[property]) {
//       return true;
//     }
//     else if (object.password !== object.password_confirmation){
//       return true;
//     }
//   }
//   return false;
// }
//
// function capitalize(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }
//
// class SignUpPage extends Component {
//   constructor(props){
//     super()
//     this.state = {
//       modalState: false,
//       canSeeTheForm: true
//     }
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }
//
//   closeModal(event){
//     event.preventDefault();
//     this.setState({
//       modalState: false,
//       canSeeTheForm: true
//     })
//   }
//
//   handleSubmit(event) {
//     event.preventDefault();
//     const {onSignUp} = this.props;
//     const formData = new FormData(event.currentTarget);
//     const signUpData = {
//       first_name: capitalize(formData.get('first_name')),
//       last_name: capitalize(formData.get('last_name')),
//       email: formData.get('email'),
//       password: formData.get('password'),
//       password_confirmation: formData.get('password_confirmation')
//     }
//     console.log('empty object:',hasEmptyProp(signUpData));
//     console.log('signUpData:', signUpData);
//
//     if (hasEmptyProp(signUpData)){
//       this.setState({
//                 modalState: true,
//                 canSeeTheForm: false
//                    })
//     }
//     else {
//       console.log('Data was sent to database.');
//       User
//         .createParentUser(signUpData)
//         .then( data => {
//           // console.log('data in signup: ', data);
//           if(!data.error){
//             console.log('New user was successfully sign up.')
//             const jwt = data.token;
//             localStorage.setItem('jwt', jwt);
//             onSignUp();
//             this.props.history.push('/');
//           }
//         });
//     }
//   }
//
//   render(){
//
//     return(
//       <main className="SignInUpPage">
//         <div className="wrapper">
//           <div className="bgi-2">
//             <div className="wrapperDimm">
//               <form onSubmit={this.handleSubmit}
//                     style={{display: this.state.canSeeTheForm ? 'block' : 'none' }}>
//
//                 <div className="signInContainer-1">
//                   <label htmlFor="first_name">First Name</label>
//                   <input name="first_name" id="first_name" />
//                 </div>
//
//                 <div className="signInContainer-1">
//                   <label htmlFor="last_name">Last Name</label>
//                   <input name="last_name" id="last_name" />
//                 </div>
//
//                 <div className="signInContainer-1">
//                   <label htmlFor="email">Email</label>
//                   <input type="email" name="email" id="email" />
//                 </div>
//
//                 <div className="signInContainer-1">
//                   <label htmlFor="password">Password</label>
//                   <input type="password" name="password" id="password" />
//                 </div>
//
//                 <div className="signInContainer-1">
//                   <label htmlFor="password_confirmation">Password Confirmation</label>
//                   <input
//                     type="password"
//                     name="password_confirmation"
//                     id="password_confirmation"
//                   />
//                 </div>
//
//                 <div className="signInContainer-2">
//                   <input type="submit" value="Sign Up" />
//                 </div>
//               </form>
//
//               <div className="modal" id="modal" style={{display: this.state.modalState ? 'table' : 'none' }}>
//                 <div className="modal__dialog">
//                   <section className="modal__content">
//                     <header className="modal__header">
//                       <div className="modal__title">Ups, you forgot to fill up some information
//                       <br/>or your Password and Password Confirmation don't match!</div>
//                       <div className="modal__title">Please, try again..</div>
//                       <button className="modal__close"
//                               onClick={this.closeModal}
//                       >x</button>
//                     </header>
//                   </section>
//                 </div>
//               </div>
//
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }
// }
//
// export default SignUpPage;
