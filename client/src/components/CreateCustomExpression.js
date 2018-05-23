import React from 'react';

function CreateCustomExpression(props){
  const {onSubmit = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const expression = {
      expression: formData.get('expression'),
      solution: formData.get('solution')
    }
    onSubmit(expression);
    event.target.reset();
  }

  return(
    <main className="CreateCustomExpression">
      <form onSubmit={handleSubmit}>
        <div className="container-customQuiz">
          <div className="container-quiz1">
            <div className="field">
              <label htmlFor="expression">Expression</label>
              <input type="text" name="expression" id="expression" />
            </div>

            <div className="field">
              <label htmlFor="solution">Solution</label>
              <input type="text" name="solution" id="solution" />
            </div>
          </div>
          <div className="container-quiz2 customExpression">
            <div>
              <input type='submit' value='Add Expression'/>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

export default CreateCustomExpression;
