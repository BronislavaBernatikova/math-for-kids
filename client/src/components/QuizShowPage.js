import React,{Component} from 'react';
import { Quiz, Answer } from '../lib/requests';
import ExpressionDetails from './ExpressionDetails';

class QuizShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      expression: {}
    }
    this.createAnswer = this.createAnswer.bind(this);
    console.log('this.state:', this.state);
    console.log('this.props:', this.props.newQuiz);
  }

  createAnswer(answerParams){
    Answer
      .create(answerParams)
      .then( answer => {
        console.log('answer created:', answer);
        this.setState({
          expression: 
        })
      })
  }

  componentDidMount(){
    //const quizId = this.props.match.params.id;

    this.setState({
      expression: this.props.newQuiz.expressions[0]
    })
  }

  render(){
    const expression = this.state.expression;
    console.log('this.state.expression:', this.state.expression);
    //const quizId = this.props.match.params.id;
    const quizId = this.props.newQuiz.id;
    return(
      <div className="QuizShowPage">
        <h5>Quiz Show Page</h5>
        <ExpressionDetails expression={expression}
                           quizId={quizId}
                           onSubmit={this.createAnswer}
        />
      {/* {
        expressions && expressions.map( expression => {
          <ExpressionDetails expression={expression}
                             quizId={quizId}
                             onSubmit={this.createAnswer}
          />
        })
      } */}
      </div>
    )
  }

}

export default QuizShowPage;
