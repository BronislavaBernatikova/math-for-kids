import React,{Component} from 'react';
import { Quiz, Answer } from '../lib/requests';
import StopWatch from './StopWatch';
import CorrectWrongAnswers from './CorrectWrongAnswers';
import { Progress } from 'semantic-ui-react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import '../styling/QuizShowPage.css';

class QuizShowPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      quiz: {},
      expressions: [],
      expression_count: 0,
      right_answer_count: 0,
      answered_count: 0,
      current_expression: {},
      seconds: 0,
      modal: false
    }
    this.counter = null;
    this.createAnswer = this.createAnswer.bind(this);
    this.updateQuizData = this.updateQuizData.bind(this);
    this.startStopWatch = this.startStopWatch.bind(this);
    this.stopStopWatch = this.stopStopWatch.bind(this);
  }

  startStopWatch(){
      this.counter = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }, 1000);
  }

  stopStopWatch(){
    clearInterval(this.counter);
  }

  createAnswer(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user_answer = parseFloat(formData.get('user_answer'));
    const current_expression = this.state.current_expression;
    let correct_answer;
    event.target.reset();

    user_answer === current_expression.solution ? (correct_answer = true) : (correct_answer = false);

    const answerParams = {
      quiz_id: this.state.quiz.id,
      correct_answer: correct_answer,
      expression_id: this.state.current_expression.id
    }

    Answer
      .create(answerParams)
      .then( answer => {

            answer.correct_answer ? [
              this.setState({
                right_answer_count: (this.state.right_answer_count + 1),
                answered_count: (this.state.answered_count + 1)
              }),
              this.setState({
                current_expression: this.props.newQuiz.expressions[this.state.answered_count]
              })
            ] : [
              this.setState({
                answered_count: (this.state.answered_count + 1)
              }),
              this.setState({
                current_expression: this.props.newQuiz.expressions[this.state.answered_count]
              })
            ]

      })
  }

  updateQuizData(quizDataToUpdate){
    Quiz
      .update(quizDataToUpdate)
  }

  componentDidMount(){
    if(this.props.newQuiz){
      this.setState({
        quiz: this.props.newQuiz,
        expressions: this.props.newQuiz.expressions,
        expression_count: this.props.newQuiz.expression_count,
        right_answer_count: 0,
        answered_count: 0,
        current_expression: this.props.newQuiz.expressions[0],
      })
      this.startStopWatch();
    }
  }

  componentDidUpdate() {
    if (this.button) {
      this.button.click()
    }
  }

  render(){
    const { current_expression, answered_count, expression_count } = this.state;
    const quizId = this.state.quiz.id;
    const percent = (answered_count / expression_count) * 100 // progress

    if(!answered_count && !expression_count){
      return(
        <div className="QuizShowPage">
          <div className="wrapper-3">
            <div className="dimmer">
              <div className="errorMessage">:(<br/>Ups, something went wrong.<br/> Return to User Page, please!</div>
            </div>
          </div>
        </div>
      )}

    else if(answered_count < expression_count){
      return(
        <div className="QuizShowPage">
          <div className="wrapper-1">

            <div className="main-container-1">
              <div className="container-1">
                <div className="stopWatch">
                  <StopWatch seconds={this.state.seconds}/>
                </div>
                <div className="counter">Expression number {answered_count + 1} of {expression_count}</div>
              </div>
              <div className="progress">
                <Progress percent={percent} active color='olive' />
              </div>
            </div>

            <div className="main-container-2">

                <div className="expression">
                  <div className="square">{current_expression.num1}</div>
                  <div className="square">{current_expression.operator}</div>
                  <div className="square">{current_expression.num2}</div>
                  <form id="answerForm" onSubmit={this.createAnswer}>
                    <div>
                      <input name="user_answer" id="user_answer"/>
                    </div>
                    <div>
                      <input type="submit" value="Next"/>
                    </div>
                  </form>
                </div>
            </div>

          </div>
        </div>
      )}

      else if(answered_count === expression_count){
        const right_answer = this.state.right_answer_count;
        const wrong_answer = this.state.expression_count - right_answer;

        const quizDataToUpdate = {
          right_answer: right_answer,
          time: this.state.seconds,
          quiz_id: quizId
        }
        this.stopStopWatch();
        this.updateQuizData(quizDataToUpdate)
        return(
          <div className="QuizShowPage">
            <div className="wrapper-2">

              <Modal className="mainModal" trigger={<button ref={node => this.button = node} id="button" style={{display: 'none'}} >Click me</button>}>
                <Modal.Content className="modalContent" image>
                  <Image wrapped size='medium' src={require('../images/math-for-kids-finished.png')} />
                  <Modal.Description className="modalDescription">

                    <div className="red">Quiz is Finished!</div>
                    <div className="time">
                      <div className="duration">Duration</div>
                      <StopWatch seconds={this.state.seconds} />
                    </div>
                    <div> Wrong answers: {wrong_answer}</div>
                    <p>Now correct your wrong answers please!</p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>

              <CorrectWrongAnswers quizId={quizId}/>

            </div>
           </div>
      )}

   }
}

export default QuizShowPage;

{/* <div className="container-1">
  <div className="settings">
    <p>Current quiz settings:  ({current_expression.operator})<br />
       Difficulty: numbers up to {current_expression.difficulty}<br />
       Number of expressions:{expression_count}
    </p>
  </div>
</div> */}

{/* <div className="container-3">
  <div className="counter">expression number {answered_count + 1}</div>
</div> */}

// else if(answered_count === expression_count){
//   const right_answer = this.state.right_answer_count;
//   const wrong_answer = this.state.expression_count - right_answer;
//
//   const quizDataToUpdate = {
//     right_answer: right_answer,
//     time: this.state.seconds,
//     quiz_id: quizId
//   }
//   this.stopStopWatch();
//
//   return(
//     <div className="QuizShowPage">
//       <div className="wrapper-2">
//         <div className="finished">Quiz is finished!</div>
//
//         <div className="main-container-4">
//           <div className="time">
//             <div><b>Duration:</b></div>
//             <StopWatch seconds={this.state.seconds} />
//           </div>
//           <div> Wrong answers: {wrong_answer}</div>
//         </div>
//           {this.updateQuizData(quizDataToUpdate)}
//
//           <CorrectWrongAnswers quizId={quizId}/>
//
//       </div>
//     </div>
//   )}
