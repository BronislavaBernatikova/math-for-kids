import React, { Component } from 'react';
import { Quiz, Answer } from '../lib/requests';
import Timer from './Timer';
import CorrectWrongAnswers from './CorrectWrongAnswers';
import { Image, Modal, Progress } from 'semantic-ui-react'
import '../styling/QuizShowPage.css';
// import { withRouter } from 'react-router-dom';

class QuizShowPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      quiz: {},
      expressions: [],
      answered_count: 0,
      right_answer_count: 0,

      expression: {},
      loading: true,
      newQuiz: {}
    }
    this.updateAnswer = this.updateAnswer.bind(this);
    this.updateQuiz = this.updateQuiz.bind(this);
  }

  updateAnswer(event){
    event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const user_answer = parseFloat(formData.get('user_answer'));
      const right_answer = this.state.expression.solution;
      let correct_answer;
    event.target.reset();

    user_answer === right_answer ? (correct_answer = true) : (correct_answer = false);

    const dataToUpdate = {
      correct_answer: correct_answer,
      answer_id: this.state.expression.id
    }

    Answer
      .update(dataToUpdate)
      .then( answer => {
        console.log('answer:', answer);

        let {right_answer_count} = this.state;
        answer.correct_answer ? (right_answer_count += 1) : (right_answer_count);
        console.log('this.state:', this.state);
          this.setState({
            right_answer_count: right_answer_count,
            answered_count: this.state.answered_count + 1,
            expression: this.state.expressions[this.state.answered_count +1 ]
          })
      })
  }

  updateQuiz(timeData){
    console.log('Updating quizData')
    let quizDataToUpdate = {
      time: timeData,
      quiz_id: this.state.quiz.id,
      right_answer: this.state.right_answer_count,
      repeated: this.state.quiz.repeated + 1
    };

    Quiz
      .update(quizDataToUpdate)
      .then( quiz => {
        console.log('quiz:', quiz);
          this.setState({
            newQuiz: quiz
          })
      })
  }

  triggerStopTimer(){
    if (this.refs.child) {
      this.refs.child.stopTimer();
    }
  }

  componentDidMount(){
    const {quiz} = this.props.location.state;
    const quizId = quiz.id;

    Quiz
      .one(quizId)
      .then( quiz => {
        this.setState({
          quiz: quiz,
          expressions: quiz.expressions,
          expression: quiz.expressions[this.state.answered_count],
          loading: false,
          timer:true,
          time: 0
        })
        console.log('quiz in mount:', quiz);
      })
  }

  componentDidUpdate() {
    if (this.button) {
      this.button.click()
    }
  }

  render(){
    const { quiz, expression, answered_count, loading, right_answer_count } = this.state;
    const expression_count = this.state.expressions.length;
    const quizId = quiz.id;
    const percent = (answered_count / expression_count) * 100 // progress bar

    if(loading){
      return(
        <div className="QuizShowPage">
          <div className="wrapper-1">
            <div className="loading">Loading expressions ...</div>
          </div>
        </div>
      )}

    else if(answered_count < expression_count){

      const displayExpression = (quiz.source === "custom") ? (
        <div className="square">{expression.expression}</div>
      ):(
        <div>
          <div className="square">{expression.num1}</div>
          <div className="square">{expression.operator}</div>
          <div className="square">{expression.num2}</div>
        </div>
      )

      return(
        <div className="QuizShowPage">
          <div className="wrapper-1">

            <div className="main-container-1">
              <div className="container-1">
                <div className="stopWatch">
                  <Timer ref="child"
                         timer={true}
                         passingTimeData={this.updateQuiz}
                  />
                </div>
                <div className="counter">Expression number {answered_count + 1} of {expression_count}</div>
              </div>
              <div className="progress">
                <Progress percent={percent} active color='olive' />
              </div>
            </div>

            <div className="main-container-2">
              <div className="expression">
                {displayExpression}
                <form id="answerForm" onSubmit={this.updateAnswer}>
                  <div>
                    <input name="user_answer" id="user_answer" />
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

    else if(answered_count === expression_count && quiz.repeated !== 0){
      const wrong_answer = expression_count - right_answer_count;
      const last_right_answers = this.state.quiz.right_answer_count;
      console.log('answered_count in repeat:', answered_count);
      console.log('expression_count in repeat:', expression_count);

      this.triggerStopTimer()

      return(
        <div className="QuizShowPage">
          <div className="wrapper-2">

            <Modal className="mainModal" trigger={<button ref={node => this.button = node} id="button" style={{display: 'none'}} >Click me</button>}>
              <Modal.Content className="modalContent" image>
                <Image wrapped size='medium' src={require('../images/math-for-kids-finished.png')} />
                <Modal.Description className="modalDescription">

                  <div className="finished">
                          {last_right_answers < right_answer_count ? (
                             <p>Well Done!<br/>You improved your score from last time!</p>
                          ):(
                            <p>You haven't improve your score from last time.<br/>Try harder!</p>
                          )}
                  </div>
                  <div className="time">
                    <div className="duration">Duration</div>
                    <div>{this.state.newQuiz.time}</div>
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

      else if(answered_count === expression_count && quiz.repeated === 0){
        const right_answer = this.state.right_answer_count;
        // console.log('right_answer:', right_answer);
        const wrong_answer = expression_count - right_answer;

        const quizDataToUpdate = {
          right_answer: right_answer,
          time: this.state.seconds,
          quiz_id: quizId
        }
        this.triggerStopTimer()
        // this.updateQuizData(quizDataToUpdate)
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
                      <div>{this.state.newQuiz.time}</div>
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

// else if(answered_count < expression_count){
//   return(
//     <div className="QuizShowPage">
//       <div className="wrapper-1">
//
//         <div className="main-container-1">
//           <div className="container-1">
//             <div className="stopWatch">
//               <Timer ref="child"
//                      timer={true}
//                      passingTimeData={this.updateQuiz}
//               />
//             </div>
//             <div className="counter">Expression number {answered_count + 1} of {expression_count}</div>
//           </div>
//           <div className="progress">
//             <Progress percent={percent} active color='olive' />
//           </div>
//         </div>
//
//         <div className="main-container-2">
//           <div className="expression">
//             <div className="square">{expression.num1}</div>
//             <div className="square">{expression.operator}</div>
//             <div className="square">{expression.num2}</div>
//             <form id="answerForm" onSubmit={this.updateAnswer}>
//               <div>
//                 <input name="user_answer" id="user_answer" />
//               </div>
//               <div>
//                 <input type="submit" value="Next"/>
//               </div>
//             </form>
//           </div>
//         </div>
//
//       </div>
//     </div>
//   )}
