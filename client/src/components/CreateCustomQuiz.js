import React, { Component } from 'react';
import CreateCustomExpression from './CreateCustomExpression';

class CreateCustomQuiz extends Component {
  constructor(props){
    super(props)
    this.state = {
      expressions: []
    }
    this.addExpression = this.addExpression.bind(this);
    this.createCustomQuiz = this.createCustomQuiz.bind(this);
    this.removeExpression = this.removeExpression.bind(this);

  }

  addExpression(expression){
    const { expressions } = this.state;
    expressions.push(expression);
    this.setState({
      expressions: expressions
    })
  }

  createCustomQuiz(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get('title');
    event.target.reset();
    const customExpressions = this.state.expressions;
    const customQuizData = {
                              title: title,
                              customExpressions: customExpressions
                            }
    // console.log('customExpressions:', customExpressions);
    // console.log('customQuizData:', customQuizData);
    this.props.sendData(customQuizData);
    // console.log('this.props:', this.props);
  }

  removeExpression(event){
    event.preventDefault();
    const {currentTarget} = event;
    const expressionIndex = parseInt(currentTarget.dataset.id, 10);
    const { expressions } = this.state;
    const removed = expressions.splice(expressionIndex,1);
    console.log('removed:', removed);
    this.setState({
      expressions: expressions
    })
    // console.log('expressions:', expressions);
  }

  render(){
    const { expressions } = this.state;
    return(
      <main className="CreateCustomQuiz">
        <form onSubmit={this.createCustomQuiz}
                style={{marginTop: '0 3rem'}}
        >

          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>

          <ul>
          {
            expressions.map((expression, index) => {
              return(
                <li key={index} id={`${index}`}>
                  <div>
                    <div>Expression {index + 1}:</div>
                    <div>{expression.expression} => {expression.solution}</div>
                    <button
                      data-id={`${index}`}
                      onClick={this.removeExpression}
                    >Remove</button>
                  </div>
                </li>
              )
            })
          }
          </ul>
          {/* <CreateCustomExpression onSubmit={this.addExpression}/> */}

          <div>
            <input type="submit" value="Create Quiz" />
          </div>

        </form>
        <div>Create Expression:</div>
        <CreateCustomExpression onSubmit={this.addExpression}/>
      </main>
    )
  }

}

export default CreateCustomQuiz;
