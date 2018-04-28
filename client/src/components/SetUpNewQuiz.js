import React, {Component} from 'react';
import '../styling/SetUpNewQuiz.css';

class SetUpNewQuiz extends Component {

  constructor(props){
    super(props);
    this.state = {
      parentUser: {},
      currentQuizSetUps: [],
      customQuizes: [],
      numberOfExpressions: '10',
      arithmeticOperator: 'add',
      difficulty: '100',
      currentQuizId: 'null',
      customQuizId: 'null',
      isEnabled: false
    }
    this.handleChangeNumberOfExpressions = this.handleChangeNumberOfExpressions.bind(this);
    this.handleChangeArithmeticOperator = this.handleChangeArithmeticOperator.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
    this.handleChangeCurrentQuizId = this.handleChangeCurrentQuizId.bind(this);
    this.handleChangeCustomQuizId = this.handleChangeCustomQuizId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeNumberOfExpressions(event) {
    // event.preventDefault();
      this.setState({
        numberOfExpressions: event.target.value
      })
    }
  handleChangeArithmeticOperator(event) {
    // event.preventDefault();
    this.setState({
      arithmeticOperator: event.target.value
    })
  }
  handleChangeDifficulty(event) {
    // event.preventDefault();
    this.setState({
      difficulty: event.target.value
    })
  }
  handleChangeCurrentQuizId(event) {
    // event.preventDefault();
    this.setState({
      currentQuizId: event.target.value
    })
  }
  handleChangeCustomQuizId(event) {
    let disable;
    if(event.target.value === 'null'){
      disable = false;
    }
    else disable = true;
    this.setState({
      customQuizId: event.target.value,
      isEnabled: disable
    })
  }

  handleSubmit (event) {
    event.preventDefault();

    const newQuiz = {
      numberOfExpressions: this.state.numberOfExpressions,
      arithmeticOperator: this.state.arithmeticOperator,
      difficulty: this.state.difficulty,
      currentQuizId: this.state.currentQuizId,
      customQuizId: this.state.customQuizId
    };
    console.log('newQuiz:', newQuiz);
    this.props.onSubmit(newQuiz);
  }

  // componentWillReceiveProps(nextProps) {
  // this.setState({ parentUser: nextProps.parentUser });
  // }

  render(){
    const {parentUser, currentQuizSetUps, customQuizes } = this.props;
    const {isEnabled} = this.state;
    console.log('isEnabled:', isEnabled);
    // console.log('parentUser in quiz render:', parentUser);
    return (
      <form className="SetUpNewQuiz"
            onSubmit={this.handleSubmit}
      >
        <div className="container-quiz1">
        <fieldset disabled={isEnabled}>
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
      </fieldset>

        <div className="field">
          <label>Select Student</label>
          <select name="currentQuizId"
                  value={this.state.currentQuizId}
                  onChange={this.handleChangeCurrentQuizId}
            >
              {
                currentQuizSetUps && currentQuizSetUps.map((currentQuiz, index) => {
                  return(

                    <option key={index}
                            value={`${currentQuiz.id}`}>{currentQuiz.first_name}{}{currentQuiz.last_name}
                    </option>
                  )
                })
              }

          </select>
        </div>
        <fieldset>
        <div className="field">
          <label>Select Custom Quiz</label>
          <select name="customQuiz"
                  value={this.state.customQuiz}
                  onChange={this.handleChangeCustomQuizId}
            >
              {
                customQuizes && customQuizes.map((customQuiz, index) => {
                  return(
                    <option key={index}
                            value={`${customQuiz.id}`}>{customQuiz.title}
                    </option>
                  )
                })
              }
              <option key="xy" value='null'>Generate Quiz</option>

          </select>
        </div>
      </fieldset>

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
