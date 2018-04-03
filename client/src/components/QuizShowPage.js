import React,{Component} from 'react';
import { Quiz, Answer } from '../lib/requests';
import ExpressionDetails from './ExpressionDetails';

class QuizShowPage extends Component {
  constructor(props){
    super(props);
    //debugger;
    console.log('this.props:', this.props.newQuiz);
    this.state = {
      quiz: {},
      expressions: [],
      expression_count: 0,
      right_answer_count: 0,
      answered_count: 0,
      current_expression: {}
      //loading: true
    }
    this.createAnswer = this.createAnswer.bind(this);
    this.addRightAnswerCountToQuiz = this.addRightAnswerCountToQuiz.bind(this);
  }

  createAnswer(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user_answer = parseFloat(formData.get('user_answer'));
    const current_expression = this.state.current_expression;
    let correct_answer;
    //debugger;
    // if(user_answer === current_expression.solution){
    //   correct_answer = true
    // } else {
    //   correct_answer = false
    // }
    user_answer === current_expression.solution ? (correct_answer = true) : (correct_answer = false);

    const answerParams = {
      quiz_id: this.state.quiz.id,
      correct_answer: correct_answer,
      expression_id: this.state.current_expression.id
    }

    Answer
      .create(answerParams)
      .then( answer => {
        console.log('answer created:', answer);
        console.log('correct answer?:', answer.correct_answer);
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
            console.log('answered_count-v:', this.state.answered_count);
            console.log('right_answer_count-v:', this.state.right_answer_count);
            console.log('current_expression-v:', this.state.current_expression);
      })
  }

  addRightAnswerCountToQuiz(right_answer){
    const dataToUpdate = {
      right_answer_count: right_answer,
      quiz_id: this.state.quiz.id
    }

    Quiz
      .update(dataToUpdate)

  }

  componentDidMount(){
    this.setState({
      //current_expression: this.state.expressions[this.state.answered_count],
      //loading: false
      quiz: this.props.newQuiz,
      expressions: this.props.newQuiz.expressions,
      expression_count: this.props.newQuiz.expression_count,
      right_answer_count: 0,
      answered_count: 0,
      current_expression: this.props.newQuiz.expressions[0]
    })
    // console.log('this.props JB:', this.props.newQuiz);
    // console.log('this.state.quiz JB:', this.state.quiz);
  }

  render(){
    const current_expression = this.state.current_expression;
    const answered_count = this.state.answered_count;
    const expression_count = this.state.expression_count;
    const quizId = this.state.quiz.id;
    const loading = this.state.loading;
    //console.log('current_expression in render:', current_expression);
    //console.log('answered_count in render:', answered_count);
    //console.log('expression_count in render:', expression_count);
    if(!answered_count && !expression_count){
      return(
        <div>Something went wrong</div>
      )
    }

    if(answered_count < expression_count){
      return(
        <div className="QuizShowPage">
          <h5>Quiz Show Page</h5>
          <p>Current quiz settings: {"  "}
            {current_expression.operator}
            , {"  "} difficulty -> numbers up to
            {current_expression.difficulty}
            , {"  "} number of expressions -> {expression_count}
          </p>

            <div>expression number {answered_count + 1}</div>
            <div>{current_expression.num1}</div>
            <div>{current_expression.operator}</div>
            <div>{current_expression.num2}</div>

            <form onSubmit={this.createAnswer}>
              <div>
                <input name="user_answer" id="user_answer" />
              </div>

              <div>
                <input type="submit" value="Next"/>
              </div>
            </form>
        </div>
      )}

      if(answered_count === expression_count){
        const right_answer= this.state.right_answer_count;
        const wrong_answer= this.state.expression_count - right_answer;

        return(
          <div className="QuizShowPage" >
            <h3>Quiz is finished.</h3>
            <h4>You have {wrong_answer} wrong answers</h4>
            {this.addRightAnswerCountToQuiz(right_answer)}
          </div>
        )
      }
      if (!current_expression) {
        return (
          <main
            className="QuizShowPage"
            style={{margin: '0 1rem'}}
          >
            <h2>Expressions</h2>
            <h4>Loading...</h4>
          </main>
        )
      }

   }
}

export default QuizShowPage;
