import React, {Component} from 'react';
import { User, Quiz } from '../lib/requests';
import QuizIndex from './QuizIndex';
import SetUpNewQuiz from './SetUpNewQuiz';



class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
    this.createNewQuiz = this.createNewQuiz.bind(this);
  }

  createNewQuiz(quizParams){
    console.log('quizParams:', quizParams);
    Quiz
      .create(quizParams)
      .then( quiz => {
        console.log('quiz in userpage:', quiz);

        const quizId = quiz.id;
        // this.setState({
        //   newQuiz : quiz
        // })
        const {newQuizData =()=> {} } = this.props;
        newQuizData(quiz);
        this.props.history.push(`/quizes/${quizId}`);
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
    //console.log('userPage-quizes: ', this.state.user.quizes);
    //const user = this.state.user;
    const quizes = this.state.user.quizes;
      return(
        <main>
          <SetUpNewQuiz onSubmit={this.createNewQuiz} />
          <QuizIndex quizes={quizes} />
        </main>
      );
  }
}

export default UserPage;
//handleSubmit={this.handleSubmit}
