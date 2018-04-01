import React from 'react';

function ExpressionDetails(props){
  const { quizId, expression, onSubmit = () => {} } = props;

  const handleSubmit = event => {
    event.preventDefault;
    const formData = new FormData(event.currentTarget);
    const user_answer = parseFloat(formData.get('user_answer'));
    const expressionId = expression.id

    if(user_answer === expression.solution){
      onSubmit({
        expression_id: expressionId,
        correct_answer: true,
        quiz_id: quizId
      })
    }
    if(user_answer !== expression.solution){
      onSubmit({
        expression_id: expressionId,
        correct_answer: false,
        quiz_id: quizId
      })
    }
  }

  return(
    <div className="ExpressionDetails">
      <div>{expression.num1}</div>
      <div>{expression.operator}</div>
      <div>{expression.num2}</div>

      <form onSubmit={handleSubmit}>
        <div>
          <input name="user_answer" id="user_answer" />
        </div>

        <div>
          <input type="submit" value="Next"/>
        </div>
      </form>
    </div>
  )
}

export default ExpressionDetails;
