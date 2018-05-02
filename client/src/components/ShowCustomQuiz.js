import React, {Component} from 'react';
import { CustomQuiz } from '../lib/requests';

class ShowCustomQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customQuiz: {}
    }
  }

  componentDidMount(){
    const customQuizId = this.props.location.state.quiz.id;

    CustomQuiz
      .one(customQuizId)
      .then( customQuiz => {
        // console.log('customQuiz:', customQuiz);
        this.setState({
          customQuiz: customQuiz
        })
      })

  }

  render(){
    const { customQuiz } = this.state;
    const { customExpressions } = customQuiz;

    return(
      <main className="ShowCustomQuiz">
        <div>{customQuiz.title}</div>
        <div>{customQuiz.number_of_expressions}</div>
        {
          customExpressions && customExpressions.map((expression, index) => {
            return(
              <div key="index">
                <div>custom expression:</div>
                <div>{expression.expression}</div>
                <div>{expression.solution}</div>
                <button
                      data-id={expression.id}
                      onClick={this.deleteExpression}
                    >Delete</button>
              </div>
            )
          })
        }
      </main>
    )
  }
}
export default ShowCustomQuiz;

// this.setState({
//   customQuiz: {
//     customExpressions: [],
//     ...customQuiz
//   }
// })
