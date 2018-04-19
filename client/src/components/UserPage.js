import React, {Component} from 'react';
import { User, Quiz } from '../lib/requests';
import QuizIndex from './QuizIndex';
import SetUpNewQuiz from './SetUpNewQuiz';
import '../styling/UserPage.css';



class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
    this.createNewQuiz = this.createNewQuiz.bind(this);
  }

  createNewQuiz(quizParams){
    Quiz
      .create(quizParams)
      .then( quiz => {
        // console.log('quiz:', quiz);
        // console.log('this.props.history:', this.props.history);
        this.props.history.push({
          pathname: `/quizes/new`,
          state: { quiz: quiz }
        });

      })
  }

  componentDidMount(){
    const userId = localStorage.userId;
    //console.log('userId:', userId);
    User
      .one(userId)
      .then( user => {
        //console.log('user in then:', user)
        this.setState({
          user: user
        })
      })
  }

  render(){
    const quizes = this.state.user.quizes;
      return(
        <main className="UserPage">
          <SetUpNewQuiz onSubmit={this.createNewQuiz} />
          <QuizIndex quizes={quizes} />
        </main>
      );
  }
}

export default UserPage;
