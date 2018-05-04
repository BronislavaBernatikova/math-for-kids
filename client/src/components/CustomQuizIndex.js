import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/QuizIndex.css';

function CustomQuizIndex (props) {
  const { customQuizes = [] } = props;
  // const {onDeleteClick = () => {}} = props;


      return(
       <div className="CustomQuizIndex">
         <div className="text2">Quizes you alredy created</div>
         <div className="mainContainer">
         <ul className="list">
           {
             customQuizes.map((quiz,index) => {
             return(
               <li key={index} id={`{index}`}>
                 <div className="container-list border">
                   <div className="1">{index + 1}</div>
                   <div className="2">{quiz.title}</div>
                   <div className="3">{quiz.number_of_expressions} expressions</div>
                   <div className="4">
                     <Link to={{
                               pathname: `/customQuizes/show/${quiz.id}`,
                               state: { quiz: quiz }
                             }}>Show Quiz</Link>
                   </div>
                 </div>
               </li>
             )
           })}
         </ul>
       </div>
       </div>
    )
}

export default CustomQuizIndex;
