import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import SignInPage from './SignInPage';
import QuizShowPage from './QuizShowPage';
import SignUpPage from './SignUpPage';
import NavBar from './NavBar';
import HomePage from './HomePage';
import UserPage from './UserPage';
// import RepeatQuizPage from './RepeatQuizPage';

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

  isSignedIn(){

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
    // localStorage.removeItem('jwt');
    localStorage.clear();
    this.setState({
      user: null
    });
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
                <Route path="/users/:id"
                       render={ props => user ? (
                         <UserPage {...props} newQuizData={this.quizDataFromUserPage} />
                       ):(
                         <Redirect to="/sign_in" />
                       ) }
                />
                <Route path="/quizes/show/:id"
                       render={ props => user ? (
                         <QuizShowPage {...props} />
                       ):(
                         <Redirect to="/sign_in" />
                       )}
                />
                <Route path="/quizes/new"
                       render={ props => user ? (
                         <QuizShowPage {...props} />
                       ):(
                         <Redirect to="/sign_in" />
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
        )
    }
}

export default App;
