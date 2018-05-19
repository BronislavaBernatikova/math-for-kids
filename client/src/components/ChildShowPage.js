import React, {Component} from 'react';
import { Quiz } from '../lib/requests';
import QuizIndex from './QuizIndex';
import '../styling/ChildShowPage.css';

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
    // console.log('currentQuizSetUp:', currentQuizSetUp);

    Quiz
      .all(child_id)
      .then( childInfo => {
        // console.log('childInfo:', childInfo);
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
    // console.log("custom_quiz_id:", custom_quiz_id);
    // console.log('customQuiz:', customQuiz);

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

    return(
      <main className="ChildShowPage">
        <div className="wrapper">
        <div className="flex">
          <div className="description">Current Quiz Set Up For:</div>
          <div className="childsName">{currentQuizSetUp.first_name}{' '}{currentQuizSetUp.last_name}</div>
        </div>
        {quizSetUp}
        <QuizIndex quizes={quizes}
                   parent='true'
        />
      </div>
      </main>

    )
  }
}

export default ChildShowPage;
