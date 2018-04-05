import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignInPage from './SignInPage';
import QuizShowPage from './QuizShowPage';
import SignUpPage from './SignUpPage';
import NavBar from './NavBar';
import HomePage from './HomePage';
//import AuthRoute from './AuthRoute';
import UserPage from './UserPage';
import RepeatQuizPage from './RepeatQuizPage';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data:"data from App"
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.quizDataFromUserPage = this.quizDataFromUserPage.bind(this);
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt =  localStorage.getItem('jwt');
    //console.log('jwt-app-signIn: ', jwt);
    if(jwt){
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signOut() {
    localStorage.removeItem('jwt');
    this.setState({
      user: null
    });
  }

  isSignedIn() {
    return !!this.state.user;
  }

  quizDataFromUserPage(newQuiz){
    this.setState({
      newQuiz: newQuiz
    })
    console.log('quiz data in App:', this.state.newQuiz);
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar user={user}
                  onSignOut={this.signOut}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users/:id"
                   render={ props => (
                     <UserPage {...props} newQuizData={this.quizDataFromUserPage} />
                   )}
            />
            <Route path="/quizes/show/:id"
                   render={ props => (
                     <RepeatQuizPage {...props} />
                   )}
            />
            <Route path="/quizes/new"
                   render={ props => (
                     <QuizShowPage newQuiz={this.state.newQuiz} />
                   )}
            />
            <Route path="/sign_in"
                   render={ props => (
                     <SignInPage {...props} onSignIn={this.signIn} />
                   )}
            />
            <Route path="/sign_up"
                   render={ props => (
                     <SignUpPage {...props} onSignUp={this.signIn} />
                   )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;

// import React, { Component } from 'react';
// import jwtDecode from 'jwt-decode';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import SignInPage from './SignInPage';
// import QuizShowPage from './QuizShowPage';
// import SignUpPage from './SignUpPage';
// import NavBar from './NavBar';
// import HomePage from './HomePage';
// import AuthRoute from './AuthRoute';
// import UserPage from './UserPage';
//
//
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//       data:"data from App"
//     };
//
//     this.signIn = this.signIn.bind(this);
//     this.signOut = this.signOut.bind(this);
//     //this.quizDataFromUserPage = this.quizDataFromUserPage.bind(this);
//   }
//
//   componentWillMount() {
//     this.signIn();
//   }
//
//   signIn() {
//     const jwt =  localStorage.getItem('jwt');
//     //console.log('jwt-app-signIn: ', jwt);
//     if(jwt){
//       const payload = jwtDecode(jwt);
//       this.setState({
//         user: payload
//       });
//     }
//   }
//
//   signOut() {
//     localStorage.removeItem('jwt');
//     this.setState({
//       user: null
//     });
//   }
//
//   isSignedIn() {
//     return !!this.state.user;
//   }
//
//   quizDataFromUserPage(newQuiz){
//     this.setState({
//       data: newQuiz
//     })
//     console.log('quiz data in App:', this.state.data);
//   }
//
//   render() {
//     const { user } = this.state;
//     return (
//       <Router>
//         <div className="App">
//           <NavBar user={user}
//                   onSignOut={this.signOut}
//           />
//           <Switch>
//             <Route exact path="/" component={HomePage} />
//             <AuthRoute
//               isAuthenticated={this.isSignedIn()}
//               exact
//               path="/users/:id"
//               //component={UserPage}
//               component={() => <UserPage params={{}} />}
//             />
//             <AuthRoute
//               isAuthenticated={this.isSignedIn()}
//               path="/quizes/:id"
//               component={QuizShowPage}
//             />
//             <Route path="/sign_in"
//                    render={ props => (
//                      <SignInPage {...props} onSignIn={this.signIn} />
//                    )}
//             />
//             <Route path="/sign_up"
//                    render={ props => (
//                      <SignUpPage {...props} onSignUp={this.signIn} />
//                    )}
//             />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }
//
// export default App;
//
//
//
