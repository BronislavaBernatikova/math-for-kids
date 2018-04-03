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
            answer.correct_answer ? (
              this.setState({
                right_answer_count: (this.state.right_answer_count + 1),
                answered_count: (this.state.answered_count + 1),
                current_expression: this.props.newQuiz.expressions[0]
              })
            ) : (
              this.setState({
                answered_count: (this.state.answered_count + 1),
                current_expression: this.props.newQuiz.expressions[this.state.answered_count]
              })
            )
      })
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
    console.log('current_expression:', current_expression);
    const answered_count = this.state.answered_count;
    const expression_count = this.state.expression_count;
    const quizId = this.state.quiz.id;
    const loading = this.state.loading;
    console.log('loading:', this.state.loading);
    console.log('answered_count:', answered_count);
    console.log('expression_count:', expression_count);

    if(!answered_count && !expression_count){
      return(
        <div>Something went wrong</div>
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

    if(answered_count < expression_count){
      return(
        <div className="QuizShowPage">
          <h5>Quiz Show Page</h5>

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

    if(answered_count > expression_count){
      const wrong_answer= this.state.expression_count - this.state.right_answer_count
      return(
        <div className="QuizShowPage" >
          <h3>Quiz is finished.</h3>
          <h4>You have {wrong_answer} wrong answers</h4>
        </div>
      )
    }
   }
}

export default QuizShowPage;
