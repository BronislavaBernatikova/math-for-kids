import React, {Component} from 'react';

import { Form, Button, Select } from 'semantic-ui-react';

const numberOfExpressions = [
  {key: '10', text: '10', value: '10' },
  {key: '20', text: '20', value: '20' },
  {key: '30', text: '30', value: '30' },
  {key: '40', text: '40', value: '40' },
  {key: '50', text: '50', value: '50' }
];
const arithmeticOperator = [
  {key: 'add', text: 'Adding', value: 'add' },
  {key: 'subtract', text: 'Subtraction', value: 'subtract' },
  {key: 'multiply', text: 'Multiplication', value: 'multiply' },
  {key: 'divide', text: 'Division', value: 'divide' }
];
const difficulty = [
  {key: '100', text: 'Numbers up to 100', value: '100' },
  {key: '300', text: 'Numbers up to 300', value: '300' },
  {key: '500', text: 'Numbers up to 500', value: '500' },
  {key: '700', text: 'Numbers up to 700', value: '700' },
  {key: '1000', text: 'Numbers up to 1000', value: '1000' }
];

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

  handleChangeNumberOfExpressions = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
    this.setState({ numberOfExpressions: data.value });
  }

  handleChangeArithmeticOperator = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
    this.setState({ arithmeticOperator: data.value });
  }

  handleChangeDifficulty = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
    this.setState({ difficulty: data.value });
  }

  handleSubmit (event) {
    event.preventDefault();

    const newQuiz = {
      numberOfExpressions: this.state.numberOfExpressions,
      arithmeticOperator: this.state.arithmeticOperator,
      difficulty: this.state.difficulty
    };
    console.log('newQuiz:', newQuiz);
    this.props.onSubmit(newQuiz);
  }

  render(){

    return (
      <Form className="SetUpNewQuiz"
            onSubmit={this.handleSubmit}
            style={{margin: '0 2rem'}}
      >
        <Form.Group widths='equal'>
          <Form.Field control={Select}
                      label='Number of expressions'
                       options={numberOfExpressions}
                       placeholder='Number of expressions'
                       onChange={this.handleChangeNumberOfExpressions}
                      />
          <Form.Field control={Select}
                      label='Operator'
                       options={arithmeticOperator}
                       placeholder='Operator'
                       onChange={this.handleChangeArithmeticOperator}
                      />
          <Form.Field control={Select}
                      label='Difficulty'
                       options={difficulty}
                       placeholder='Difficulty'
                       onChange={this.handleChangeDifficulty}
                      />
        </Form.Group>
        <Form.Field control={Button}>Create Quiz</Form.Field>
      </Form>
    )}
}
export default SetUpNewQuiz;
