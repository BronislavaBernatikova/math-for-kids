import React, {Component} from 'react';
import { CustomQuiz } from '../lib/requests';
import '../styling/ShowCustomQuiz.css';

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
        <div className="wrapper">
          <div className="flex">
            <div className="description">Quiz title:</div>
            <div className="data">{customQuiz.title}</div>
          </div>
          <div className="flex">
            <div className="description">Number of expressions:</div>
            <div className="data">{customQuiz.number_of_expressions}</div>
          </div>
          <div className="container">
          {
            customExpressions && customExpressions.map((expression, index) => {
              return(
                <div key="index">
                  <div className="border">{expression.expression}</div>
                  <div>{expression.solution}</div>
                </div>
              )
            })
          }
          </div>
        </div>
      </main>
    )
  }
}
export default ShowCustomQuiz;
