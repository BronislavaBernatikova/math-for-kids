import React, {Component} from 'react';
import '../styling/SetUpNewQuiz.css';

class SetUpNewQuiz extends Component {

  constructor(props){
    super(props);
    this.state = {
      numberOfExpressions: '10',
      arithmeticOperator: 'add',
      difficulty: '100'
    }
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

  handleSubmit (event) {
    event.preventDefault();

    const newQuiz = {
      numberOfExpressions: this.state.numberOfExpressions,
      arithmeticOperator: this.state.arithmeticOperator,
      difficulty: this.state.difficulty
    };
    this.props.onSubmit(newQuiz);
  }

  render(){
    return (
      <form className="SetUpNewQuiz"
            onSubmit={this.handleSubmit}
      >
        <div className="container-quiz1">
        <div className="field">
          <label>Number of expressions</label>
          <select name="numberOfExpressions"
                  value={this.state.numberOfExpressions}
                  onChange={this.handleChangeNumberOfExpressions}
          >
            <option className="option" value="10">10</option>
            <option className="option" value="20">20</option>
            <option className="option" value="30">30</option>
            <option className="option" value="40">40</option>
            <option className="option" value="50">50</option>
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
            <option value="multiply">Multiplication</option>
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
      </div>
        <div className="container-quiz2">
          <div>
          <input type="submit" value="Start New Quiz"/>
        </div>
        </div>
      </form>
    )}
}
export default SetUpNewQuiz;
