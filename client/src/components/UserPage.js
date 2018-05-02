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

  createNewQuiz(event){
    event.preventDefault();

    const {currentSetUp} = this.state;
    let quizParams;
    // console.log('custom_quiz_id:',currentSetUp.custom_quiz_id );
    if(currentSetUp.custom_quiz_id === null){
      quizParams = {
                    difficulty: currentSetUp.difficulty,
                    arithmeticOperator: currentSetUp.operator,
                    numberOfExpressions: currentSetUp.number_of_expressions
                  }
      // console.log('quizParams:', quizParams);
      Quiz
        .createGenerate(quizParams)
        .then( quiz => {
               this.props.history.push({
                                        pathname: `/quizes/new`,
                                        state: { quiz: quiz}
                                        });
              })
    }
    else {
      quizParams = { customQuizId: currentSetUp.custom_quiz_id };
      // console.log('quizParams:', quizParams);
      Quiz
        .createFromCustomQuiz(quizParams)
        .then(quiz => {
          console.log('quizxy:', quiz);
          // console.log('this.props.history:', this.props.history);
          this.props.history.push({
                                  pathname: `/quizes/new`,
                                  state: { quiz: quiz }
                                  });
        })
    }
  }

  componentDidMount(){
    const userId = localStorage.userId;
    // console.log('this.props:', this.props);

    User
      .oneChild(userId)
      .then( user => {
        // console.log('user in childUserPage:', user)
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
          <div>
            <input type='submit'
                   value='Start a New Quiz'
                   onClick={this.createNewQuiz}
            />
          </div>
          <QuizIndex quizes={quizes} />
        </main>
      );
  }
}

export default UserPage;
