import React, {Component} from 'react';
import '../styling/SetUpNewQuiz.css';

class SetUpNewQuiz extends Component {

  constructor(props){
    super(props);
    this.state = {
      parentUser: {},
      currentQuizSetUps: [],
      customQuizes: [],
      numberOfExpressions: null,
      arithmeticOperator: null,
      difficulty: null,
      currentQuizId: null,
      customQuizId: null,
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
      this.setState({
        numberOfExpressions: event.target.value
      })
      console.log('this.state:', this.state);
    }
  handleChangeArithmeticOperator(event) {
    this.setState({
      arithmeticOperator: event.target.value
    })
    console.log('this.state:', this.state);
  }
  handleChangeDifficulty(event) {
    this.setState({
      difficulty: event.target.value
    })
    console.log('this.state:', this.state);
  }
  handleChangeCurrentQuizId(event) {
    this.setState({
      currentQuizId: event.target.value
    })
    console.log('this.state:', this.state);
  }
  handleChangeCustomQuizId(event) {
    let disable;
    if(event.target.value === null || " "){
      disable = false;
    }
    else disable = true;

    this.setState({
      customQuizId: event.target.value,
      arithmeticOperator: null,
      numberOfExpressions: null,
      difficulty: null,
      isEnabled: disable
    })
    console.log('this.state:', this.state);
  }

  handleSubmit (event) {
    // event.preventDefault();

    const newQuiz = {
      numberOfExpressions: this.state.numberOfExpressions,
      arithmeticOperator: this.state.arithmeticOperator,
      difficulty: this.state.difficulty,
      currentQuizId: this.state.currentQuizId,
      customQuizId: this.state.customQuizId
    };
    // console.log('newQuiz:', newQuiz);
    this.props.onSubmit(newQuiz);
    event.target.reset();
  }

  render(){
    const {currentQuizSetUps, customQuizes } = this.props;
    const {isEnabled} = this.state;
    // console.log('isEnabled:', isEnabled);
    // console.log('parentUser in quiz render:', parentUser);
    return (
      <form className="SetUpNewQuiz"
            onSubmit={this.handleSubmit}
      >
        <div className="container-quiz1">
          <div className="field">
            <label>Select Student</label>
            <select name="currentQuizId"
                    value={this.state.currentQuizId}
                    onChange={this.handleChangeCurrentQuizId}
              >
                <option value=" ">Select..</option>
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
        <fieldset disabled={isEnabled}>
        <div className="field">
          <label>Number of expressions</label>
          <select name="numberOfExpressions"
                  value={this.state.numberOfExpressions}
                  placeholder="choose"
                  onChange={this.handleChangeNumberOfExpressions}
          >
            <option value=" ">Select..</option>
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
                  placeholder="choose"
                  onChange={this.handleChangeArithmeticOperator}
          >
            <option value=" ">Select..</option>
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
                  placeholder="choose"
                  onChange={this.handleChangeDifficulty}
            >
            <option value=" ">Select..</option>
            <option value="10">Numbers up to 10</option>
            <option value="100">Numbers up to 100</option>
            <option value="300">Numbers up to 300</option>
            <option value="500">Numbers up to 500</option>
            <option value="700">Numbers up to 700</option>
            <option value="1000">Numbers up to 1000</option>
          </select>
        </div>
      </fieldset>

        <fieldset>
        <div className="field">
          <label>Select Custom Quiz</label>
          <select name="customQuiz"
                  value={this.state.customQuiz}
                  onChange={this.handleChangeCustomQuizId}
            >
              <option value=" ">Select..</option>
              {
                customQuizes && customQuizes.map((customQuiz, index) => {
                  return(
                    <option key={index}
                            value={`${customQuiz.id}`}>{customQuiz.title}
                    </option>
                  )
                })
              }
              <option key="xy" value=" ">Generate Quiz</option>

          </select>
        </div>
      </fieldset>

      </div>
        <div className="container-quiz2">
          <div>
            <input type="submit" value="Set Up Quiz"/>
          </div>
        </div>
      </form>
    )}
}
export default SetUpNewQuiz;
