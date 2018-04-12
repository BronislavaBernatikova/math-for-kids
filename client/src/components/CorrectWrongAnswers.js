import React, { Component } from 'react';
import { Quiz } from '../lib/requests';

class CorrectWrongAnswers extends Component {
  constructor(props){
    super(props)
    this.state = {
      expressions: [],
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('in correct answers component');
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const wrongAnswered = [];

    const expressions = this.state.expressions;
    for(let expression of expressions){
      let answer = parseFloat(formData.get(`answer-${expression.id}`));
      if (answer !== expression.solution) {
        wrongAnswered.push(expression);
      }
    }
    //console.log('wrongAnswered:', wrongAnswered);

    this.setState({
      expressions: wrongAnswered
    })
    event.target.reset();
  }

  componentDidMount(){
    const quizId = this.props.quizId;
    console.log('quizId in mount:', quizId);

    Quiz
      .correct(quizId)
      .then( expressions => {
        // console.log('expressions:', expressions);

        this.setState({
          expressions: expressions,
          loading: false
        })
      })

  }
  render(){
    const { expressions, loading } = this.state;

    // console.log('expressions in render: ', expressions);
    if (loading){
      return(
        <div className="CorrectWrongAnswers">
          Loading expressions..
        </div>
      )}
    if(expressions.length === 0){
      return(
        <div className="CorrectWrongAnswers">
          <h1>Well done, you did it! :) </h1>
        </div>
      )}

    if (expressions){
      return(
        <form className="CorrectWrongAnswers"
              onSubmit={this.handleSubmit}
        >
          <div>Correct your wrong answers:</div>
          <div className="container">
          {expressions.map( expression => (
            <div className={expression.id}>
              <div>{expression.num1}</div>
              <div>{expression.operator}</div>
              <div>{expression.num2}</div>
              <input name={`answer-${expression.id}`}
                     id={`answer-${expression.id}`}
              />

          </div>
          ))}
          </div>
          <div>
            <input type="submit"
                   value="Done"
            />
          </div>
        </form>
      )}

  }
}
export default CorrectWrongAnswers;
