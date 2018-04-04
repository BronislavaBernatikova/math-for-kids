import React,{Component} from 'react';
import { Quiz, Answer } from '../lib/requests';
import ExpressionDetails from './ExpressionDetails';

class QuizShowPage extends Component {
  constructor(props){
    super(props);
    //debugger;
    this.state = {
      quiz: this.props.newQuiz,
      expressions: this.props.newQuiz.expressions,
      expression_count: this.props.newQuiz.expression_count,
      right_answer_count: 0,
      answered_count: 0,
      loading: true
    }
    //localStorage.setItem('quiz', this.props.newQuiz);
    this.createAnswer = this.createAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log('this.state:', this.state);
    // console.log('this.props:', this.props.newQuiz);
    // console.log('this.state.expressions:', this.state.expressions);
    // console.log('this.state.expression_count:', this.state.expression_count);
  }

  createAnswer(answerParams){
    const correct_answer = answerParams.correct_answer;
    console.log('answerParams:', answerParams);

    Answer
      .create(answerParams)
      .then( answer => {
        console.log('answer created:', answer);
            if (correct_answer === true){
              this.setState({
                right_answer_count: (this.state.right_answer_count + 1),
                answered_count: (this.state.answered_count + 1),
              })
            } else{
              this.setState({
                answered_count: (this.state.answered_count + 1),
              })
            }
      })
  }

  componentDidMount(){
    this.setState({
      current_expression: this.state.expressions[this.state.answered_count],
      loading: false
    })
    // console.log('this.props JB:', this.props.newQuiz);
    // console.log('this.state.quiz JB:', this.state.quiz);
  }
  // shouldComponentUpdate(nextProps) {
  //       const differentTitle = this.props.title !== nextProps.title;
  //       const differentDone = this.props.done !== nextProps.done
  //       return differentTitle || differentDone;
  //   }

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

    if(!answered_count || !expression_count){
      return(
        <div>Something went wrong</div>
      )
    }
    
    if (loading) {
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
            <ExpressionDetails expression={current_expression}
                               quizId={quizId}
                               //onSubmit={this.createAnswer}
                               handleSubmit={this.handleSubmit}
            />
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
