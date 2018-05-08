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
      currentQuizSetUp: {},
      customQuiz: {}
    }
    this.createNewQuiz = this.createNewQuiz.bind(this);
  }

  createNewQuiz(){
    // event.preventDefault();
    console.log('i am in create new quiz');
    const {currentQuizSetUp} = this.state;
    let quizParams;
    // console.log('custom_quiz_id:',currentSetUp.custom_quiz_id );
    if(currentQuizSetUp.custom_quiz_id === null){
      quizParams = {
                    difficulty: currentQuizSetUp.difficulty,
                    arithmeticOperator: currentQuizSetUp.operator,
                    numberOfExpressions: currentQuizSetUp.number_of_expressions
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
      quizParams = { customQuizId: currentQuizSetUp.custom_quiz_id };
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
          currentQuizSetUp: user.currentSetUp,
          customQuiz: user.customQuiz
        })
      })
  }

  render(){
    const quizes = this.state.user.quizes;
    const {currentQuizSetUp, customQuiz} = this.state;
    const {custom_quiz_id, difficuty, number_of_expressions, operator} = currentQuizSetUp;
    const quizSetUp = custom_quiz_id !== null  ? (
      <div>
        <div className="flex">
          <div className="description">Custom quiz:</div>
          <div className="data">{customQuiz.title}</div>
        </div>
        <div className="flex">
          <div className="description">Number of expressions:</div>
          <div className="data">{customQuiz.number_of_expressions}</div>
        </div>
      </div>
    ):(
      <div>
        <div className="flex">
          <div className="description">Difficulty:</div>
          <div className="data">{currentQuizSetUp.difficulty}</div>
        </div>
        <div className="flex">
          <div className="description">Operator:</div>
          <div className="data">{currentQuizSetUp.operator}</div>
        </div>
        <div className="flex">
          <div className="description">Number of expressions:</div>
          <div className="data">{currentQuizSetUp.number_of_expressions}</div>
        </div>
      </div>
    );

      if(custom_quiz_id === null || ( difficuty === null && number_of_expressions === null && operator === null)) {
        return(
          <main className="UserPage">
            <div className="errorMessage">Ups, your quiz was not set up yet..</div>
          </main>
        )}
      else {
        return(
          <main className="UserPage">
            <div className="wrapper">
            <div>
              {quizSetUp}
              <button type='submit'
                      value='Start a New Quiz'
                      onClick={this.createNewQuiz}
              >Start a New Quiz
              </button>
            </div>
            <QuizIndex quizes={quizes} />
          </div>
          </main>
        )}
  }
}

export default UserPage;
