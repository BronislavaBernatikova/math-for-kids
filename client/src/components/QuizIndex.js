import React, {Component} from 'react';
//import { User } from '../lib/requests';

class QuizIndex extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const quizes = this.props.quizes;
    console.log('quizesJB:', quizes);
     return(
      <div className="QuizIndex">

        <table id="quizes-table">
          <tbody>
            {quizes && quizes.map((quiz,index) => {
              return(
                <tr key={index} id={`row${index}`}>
                  <td>{quiz.date}</td>
                  <td>{quiz.expression_count}</td>
                  <td>{quiz.right_answer_count}</td>
                  <td>{quiz.time}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
     )
  }
}

export default QuizIndex;
{/* <tr>
  <th>Date</th>
  <th>No Of Expressions</th>
  <th>Right Answers</th>
  <th>Time</th>
</tr> */}
// quizes.map( quiz =>
// <tr key={quiz.id}>
//   <th>{quiz.date} </th>
//   <th>{quiz.expression_count}</th>
//   <th>{quiz.right_answer_count}</th>
//   <th>{quiz.time}</th>
// </tr>
