import React from 'react';

function SetUpNewQuiz (props) {
const {onSubmit = () => {} } = props;

function handleSubmit(event) {
  event.preventDefault();
  const formData = new formData(event.target);
  const newQuiz = {
    numberOfExpressions: formData.get('numberOfExpressions'),
    arithmeticOperator: formData.get('arithmeticOperator'),
    difficulty: formData.get('difficulty')
  };
  onSubmit(newQuiz);
}

  return (
    <form className="SetUpNewQuiz"
          onSubmit={handleSubmit}
          >
      <div class="field">
        <label>Number of expressions</label>
        <select name="numberOfExpressions">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="field">
        <label>Type</label>
        <select name="arithmeticOperator">
          <option value="add">Adding</option>
          <option value="subtract">Subtraction</option>
          <option value="multiply">Multiplycation</option>
          <option value="divide">Division</option>
        </select>
      </div>

      <div class="field">
        <label>Difficulty</label>
        <select name="difficulty">
          <option value="10">Numbers up to 10</option>
          <option value="100">Numbers up to 100</option>
          <option value="300">Numbers up to 300</option>
          <option value="500">Numbers up to 500</option>
          <option value="700">Numbers up to 700</option>
          <option value="1000">Numbers up to 1000</option>
        </select>
      </div>
    </form>
  )


}
export default SetUpNewQuiz;
