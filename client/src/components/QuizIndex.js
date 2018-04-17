import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/QuizIndex.css';

function QuizIndex (props) {
  const { quizes = [] } = props;

     return(
      <div className="QuizIndex">
        <ul className="list">
          <li>
            <div className="container-list">
              <div ></div>
              <div className="top-row">Date</div>
              <div className="top-row">Expressions</div>
              <div className="top-row">Right Answers</div>
              <div className="top-row">Duration</div>
              <div ></div>
            </div>
          </li>
          {
            quizes.map((quiz,index) => {
            return(
              <li key={index} id={`{index}`}>
                <div className="container-list border">
                  <div className="1">{index + 1}</div>
                  <div className="2">{(quiz.date).slice(0,10)}</div>
                  <div className="3">{quiz.expression_count}</div>
                  <div className="4">{quiz.right_answer_count}</div>
                  <div className="5">{quiz.time}</div>
                  <div className="7"><Link to={`/quizes/show/${quiz.id}`}>Repeat Quiz</Link></div>
                </div>
              </li>
            )
          })}
        </ul>

      </div>
     )
}

export default QuizIndex;

{/* <table id="quizes-table">
  <tbody>
    <tr>
      <th></th>
      <th>Date</th>
      <th>No Of Expressions</th>
      <th>Right Answers</th>
      <th>Time</th>
    </tr>
    {
      quizes.map((quiz,index) => {
      return(
        <tr key={index} id={`row${index}`}>
            <td>{index + 1}</td>
            <td>{(quiz.date).slice(0,10)}</td>
            <td>{quiz.expression_count}</td>
            <td>{quiz.right_answer_count}</td>
            <td>{quiz.time}</td>
            <td>
              <Link to={`/quizes/show/${quiz.id}`}>Repeat Quiz</Link>
            </td>
        </tr>
      )
    })}
  </tbody>
</table> */}
