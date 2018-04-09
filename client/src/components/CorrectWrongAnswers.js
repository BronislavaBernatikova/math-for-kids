import React, { Component } from 'react';
import { Quiz } from '../lib/requests';

class CorrectWrongAnswers extends Component {
  constructor(props){
    super(props)
    this.state = {
      expressions: [],
      loading: true,
      wrongAnswered: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('in correct answers component');
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user_answers = [];

    const expressions = this.state.expressions;
    for(let expression of expressions){
      let answer = parseFloat(formData.get(`answer-${expression.id}`));
      if (answer !== expression.solution) {
        user_answers.push(expression);
      }
    }
    console.log('user_answers:', user_answers);
    //console.log('formData:', formData);
    // this.setState({
    //   expressions: this.state.wrongAnswered
    // })

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

    console.log('expressions in render: ', expressions);
    if (loading){
      return(
        <div className="CorrectWrongAnswers">
          Loading expressions..
        </div>
      )}

    if (expressions){
      return(
        <form className="CorrectWrongAnswers"
              onSubmit={this.handleSubmit}
        >
          <div>Correct your wrong answers:</div>
          {expressions.map( expression => (
            <div className={expression.id}>
              <div>{expression.num1}</div>
              <div>{expression.operator}</div>
              <div>{expression.num2}</div>
              <div>{"---------------"}</div>
              <input name={`answer-${expression.id}`}
                     id={`answer-${expression.id}`}
              />
            </div>
          ))}
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
{/* <div className="CorrectWrongAnswers">
  <div>Correct your wrong answers:</div>
  {expressions.map( (expression, index) => {
    <div className="expression_${index}">
      <div>{expression.num1}</div>
      <div>{expression.operator}</div>
      <div>{expression.num2}</div>
    </div>
  })}
</div> */}
