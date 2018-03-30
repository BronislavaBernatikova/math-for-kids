import React,{Component} from 'react';
import { Quiz, Answer } from '../lib/requests';
import ExpressionDetails from './ExpressionDetails';

class QuizShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      quiz: {}
    }
    this.createAnswer = this.createAnswer.bind(this);
  }

  createAnswer(answerParams){
    Answer
      .create(answerParams)
      .then(

      )
  }

  componentDidMount(){
    const quizId = this.props.match.params.id;
    console.log('this.props.match:',this.props.match);
    Quiz
      .one(quizId)
      .then(
        quiz => {
          this.setState({
            quiz: quiz
          })
        }
      )
  }

  render(){
    const expressions = this.state.quiz.expressions;
    console.log('this.state:', this.state);
    const quizId = this.state.quiz.id;
    return(
      <div className="QuizShowPage">
      {
        expressions && expressions.map( expression => {
          <ExpressionDetails expression={expression}
                             quizId={quizId}
                             onSubmit={this.createAnswer}
          />
        })
      }
      </div>
    )
  }

}

export default QuizShowPage;
