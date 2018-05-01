import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/QuizIndex.css';

function QuizIndex (props) {
  const { quizes = [] } = props;
  console.log('quizes in quizIndex:', quizes );

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
                  <div className="7">
                    <Link to={{
                              pathname: `/quizes/show/${quiz.id}`,
                              state: { quiz: quiz }
                            }}>Repeat Quiz</Link>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

      </div>
     )
}

export default QuizIndex;
