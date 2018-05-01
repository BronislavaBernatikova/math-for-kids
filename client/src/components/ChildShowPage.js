import React, {Component} from 'react';
import { Quiz } from '../lib/requests';
import QuizIndex from './QuizIndex';

class ChildShowPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentQuizSetUp: {},
      quizes: [],
      customQuiz: {}
    }
  }
  componentDidMount(){
    const currentQuizSetUp = this.props.location.state.currentQuizSetUp;
    const child_id = currentQuizSetUp.child_id;
    console.log('currentQuizSetUp:', currentQuizSetUp);

    Quiz
      .all(child_id)
      .then( childInfo => {
        console.log('childInfo:', childInfo);
        this.setState({
          currentQuizSetUp: currentQuizSetUp,
          quizes: childInfo.quizes,
          customQuiz:childInfo.customQuiz
        })
      })
      // console.log('this.state:', this.state);
  }

  render(){
    const {currentQuizSetUp, quizes, customQuiz} = this.state;
    const {custom_quiz_id} = currentQuizSetUp;

    const quizSetUp = custom_quiz_id ? (
      <div>
        <div>Custom quiz -></div>
        <div>{customQuiz.title}</div>
        <div>Number of expressions:</div>
        <div>{customQuiz.number_of_expressions}</div>
      </div>
    ):(
      <div>
        <div>Difficulty:</div>
        <div>{currentQuizSetUp.difficulty}</div>
        <div>Operator:</div>
        <div>{currentQuizSetUp.operator}</div>
        <div>Number of expressions:</div>
        <div>{currentQuizSetUp.number_of_expressions}</div>
      </div>
    );

    return(
      <main className="ChildShowPage">
        <div>{currentQuizSetUp.first_name}{' '}{currentQuizSetUp.last_name}</div>
        <div>Current Quiz Set Up:</div>
        {quizSetUp}
        <QuizIndex quizes={quizes} />
      </main>

    )
  }
}

export default ChildShowPage;
