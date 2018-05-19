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
    // event.preventDefault();
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
    this.setState({
      expressions: []
    })
    // console.log('this.props:', this.props);
  }

  removeExpression(event){
    event.preventDefault();
    const {currentTarget} = event;
    const expressionIndex = parseInt(currentTarget.dataset.id, 10);
    const { expressions } = this.state;
    const removed = expressions.splice(expressionIndex,1);
    // console.log('removed:', removed);
    this.setState({
      expressions: expressions
    })
    // console.log('expressions:', expressions);
  }

  render(){
    const { expressions } = this.state;
    return(
      <main className="CreateCustomQuiz">
        <div className="text2">Create custom quiz</div>
        <div className="mainContainer">
        <div className="customQuizForm">
          <form onSubmit={this.createCustomQuiz}>
            <div className="container-customQuiz">
              <div className="container-quiz1">
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" />
                </div>
              </div>
              <div className="container-quiz2 customQuiz">
                <div>
                  <input type="submit" value="Create Quiz" />
                </div>
              </div>
            </div>
          </form>
          <CreateCustomExpression onSubmit={this.addExpression}/>
        </div>

        <div className="addExpressions">
          <div>What's in your quiz..</div>
          <ol>
          {
            expressions.map((expression, index) => {
              return(
                <li key={index} id={`${index}`}>
                  <div className="added">
                    <div>{expression.expression} = {expression.solution}</div>
                    <button
                      data-id={`${index}`}
                      onClick={this.removeExpression}
                    >x</button>
                  </div>
                </li>
              )
            })
          }
        </ol>
        </div>
      </div>
      </main>
    )
  }

}

export default CreateCustomQuiz;
// style={{marginTop: '0 3rem'}}
