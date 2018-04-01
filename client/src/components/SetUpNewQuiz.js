
import React, {Component} from 'react';

class SetUpNewQuiz extends Component {

constructor(props){
  super(props);
  this.state = {
    numberOfExpressions: '10',
    arithmeticOperator: 'add',
    difficulty: '100'
  }

  console.log('props: ', props);
  this.handleChangeNumberOfExpressions = this.handleChangeNumberOfExpressions.bind(this);
  this.handleChangeArithmeticOperator = this.handleChangeArithmeticOperator.bind(this);
  this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}

handleChangeNumberOfExpressions(event) {
    this.setState({
      numberOfExpressions: event.target.value
    })
  }
handleChangeArithmeticOperator(event) {
  this.setState({
    arithmeticOperator: event.target.value
  })
}
handleChangeDifficulty(event) {
  this.setState({
    difficulty: event.target.value
  })
}

//onSubmit(a) {return a}

handleSubmit (event) {
  event.preventDefault();

  const newQuiz = {
    numberOfExpressions: this.state.numberOfExpressions,
    arithmeticOperator: this.state.arithmeticOperator,
    difficulty: this.state.difficulty
  };
  this.props.onSubmit(newQuiz);
  //console.log('newQuiz:', newQuiz);
}
render(){
  return (
    <form className="SetUpNewQuiz"
          onSubmit={this.handleSubmit}
    >
      <div className="field">
        <label>Number of expressions</label>
        <select name="numberOfExpressions"
                value={this.state.numberOfExpressions}
                onChange={this.handleChangeNumberOfExpressions}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="field">
        <label>Operator</label>
        <select name="arithmeticOperator"
                value={this.state.arithmeticOperator}
                onChange={this.handleChangeArithmeticOperator}
        >
          <option value="add">Adding</option>
          <option value="subtract">Subtraction</option>
          <option value="multiply">Multiplycation</option>
          <option value="divide">Division</option>
        </select>
      </div>

      <div className="field">
        <label>Difficulty</label>
        <select name="difficulty"
                value={this.state.difficulty}
                onChange={this.handleChangeDifficulty}
          >
          <option value="10">Numbers up to 10</option>
          <option value="100">Numbers up to 100</option>
          <option value="300">Numbers up to 300</option>
          <option value="500">Numbers up to 500</option>
          <option value="700">Numbers up to 700</option>
          <option value="1000">Numbers up to 1000</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

}
export default SetUpNewQuiz;
