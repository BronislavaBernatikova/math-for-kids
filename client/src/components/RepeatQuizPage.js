import React, { Component } from 'react';
import { Quiz, Answer } from '../lib/requests';
import StopWatch from './StopWatch';

class RepeatQuizPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      quiz: {},
      expressions: [],
      answered_count: 0,
      expression: {},
      right_answer_count: 0,
      loading: true,
      seconds: 0
    }

    this.updateAnswer = this.updateAnswer.bind(this);
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

        let right_answer_count = this.state.right_answer_count;

        answer.correct_answer ? right_answer_count + 1 : right_answer_count;

          this.setState({
            right_answer_count: right_answer_count,
            answered_count: this.state.answered_count + 1,
            expression: this.state.expressions[this.state.answered_count +1 ]
          })
      })
  }

  componentDidMount(){
    const quizId = this.props.match.params.id

    Quiz
      .one(quizId)
      .then( quiz => {
        console.log('quiz in repeat page:', quiz);
        this.setState({
          quiz: quiz,
          expressions: quiz.expressions,
          expression: quiz.expressions[this.state.answered_count],
          loading: false
        })
      })
  }


  render(){
    const expression = this.state.expression;
    const expression_count = this.state.expressions.length;
    const answered_count = this.state.answered_count;
    const quizId = this.props.match.params.id
    const loading = this.state.loading;
    const right_answer_count = this.state.right_answer_count;
    const wrong_answer = expression_count - right_answer_count;
    const last_quiz_right_ans = this.state.quiz.right_answer_count;
     console.log("expression in render: ", expression);
     console.log('answered_count-r:', answered_count);
     console.log('expression_count-r:', expression_count);

    if(loading){
      return(
        <div className="RepeatQuizPage">
          Loading expressions ...
        </div>
      )
    }

    if(answered_count < expression_count){
      return(
        <div className="RepeatQuizPage">
          <h5>You are repeating quiz nuber: {`${quizId}`}</h5>
          <StopWatch seconds={this.state.seconds} />
          <p>Settings: {"  "}
              {expression.operator}
              , {"  "} difficulty -> numbers up to
              {expression.difficulty}
              , {"  "} number of expressions -> {expression_count}
          </p>

          <div>expression number {answered_count + 1}</div>
          <div>{expression.num1}</div>
          <div>{expression.operator}</div>
          <div>{expression.num2}</div>

          <form onSubmit={this.updateAnswer}>
            <div>
              <input name="user_answer" id="user_answer" />
            </div>

            <div>
              <input type="submit" value="Next"/>
            </div>
          </form>
        </div>
      )
    }

    if(answered_count === expression_count){
      //this.stopStopWatch();
      return(
        <div className="RepeatQuizPage">
          <div>Finished!</div>
          <div>Duration:</div>
          <StopWatch seconds={this.state.seconds} />
          <div>You have {wrong_answer} wrong answers.</div>

          {last_quiz_right_ans < right_answer_count ? (
            <p>Well Done! You improved your score from last time!</p>
          ):(
            <p>You haven't improve your score from last time. Try harder!</p>
          )}
        </div>

      )
    }

    if(!expression){
      return(
        <div>No expression to display :( )</div>
      )
    }
  }
}
export default RepeatQuizPage;
