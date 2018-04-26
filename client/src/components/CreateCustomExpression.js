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
    console.log('expression:', expression);
    onSubmit(expression);
    event.target.reset();
  }

  return(
    <main className="CreateCustomExpression"
          style={{margin: '0 2rem'}}
    >
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="expression">Expression</label>
          <input type="text" name="expression" id="expression" />
        </div>

        <div>
          <label htmlFor="solution">Solution</label>
          <input type="text" name="solution" id="solution" />
        </div>

        <div>
          <input type='submit' value='Add Expression'/>
        </div>

      </form>
    </main>
  )
}

export default CreateCustomExpression;
