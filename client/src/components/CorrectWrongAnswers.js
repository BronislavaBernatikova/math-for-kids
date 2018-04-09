import React, { Component } from 'react';
import { Quiz } from '../lib/requests';

class CorrectWrongAnswers extends Component {
  constructor(props){
    super(props)
    this.state = {
      expressions: [],
      loading: true,
      allCorect: 0
    }
    console.log('in correct answers component');
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
        <div className="CorrectWrongAnswers">
          <div>Correct your wrong answers:</div>
          {expressions.map( expression => (
            <div className={expression.id}>
              <div>{expression.num1}</div>
              <div>{expression.operator}</div>
              <div>{expression.num2}</div>
              <div>{"---------------"}</div>
            </div>
          ))}
        </div>
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
