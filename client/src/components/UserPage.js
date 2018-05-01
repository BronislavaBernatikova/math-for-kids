import React, {Component} from 'react';
import { User, Quiz } from '../lib/requests';
import QuizIndex from './QuizIndex';
import '../styling/UserPage.css';



class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      quizes: [],
      currentSetUp: {}
    }
    this.createNewQuiz = this.createNewQuiz.bind(this);
  }

  createNewQuiz(){
    const {currentSetUp} = this.state;
    const quizParams = {
    
    }
    Quiz
      .createGenerate(quizParams)
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
      .oneChild(userId)
      .then( user => {
        console.log('user in childUserPage:', user)
        this.setState({
          user: user,
          quizes: user.quizes,
          currentSetUp: user.currentSetUp
        })
      })
  }

  render(){
    const quizes = this.state.user.quizes;
      return(
        <main className="UserPage">
          <QuizIndex quizes={quizes} />
        </main>
      );
  }
}

export default UserPage;
