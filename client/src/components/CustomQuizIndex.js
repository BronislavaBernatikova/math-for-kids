import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/QuizIndex.css';

function CustomQuizIndex (props) {
  const { customQuizes = [] } = props;
  // const {onDeleteClick = () => {}} = props;


      return(
       <div className="CustomQuizIndex">
         <ul className="list">
           <li>
             <div className="container-list">
               <div ></div>
               <div className="top-row">Title</div>
               <div className="top-row">Expressions</div>
               <div ></div>
             </div>
           </li>
           {
             customQuizes.map((quiz,index) => {
             return(
               <li key={index} id={`{index}`}>
                 <div className="container-list border">
                   <div className="1">{index + 1}</div>
                   <div className="2">{quiz.title}</div>
                   <div className="3">{quiz.number_of_expressions}</div>
                   <div className="4">
                     <Link to={{
                               pathname: `/customQuizes/show/${quiz.id}`,
                               state: { quiz: quiz }
                             }}>Show Quiz</Link>
                   </div>
                   {/* <button
                     data-id={`${index}`}
                     onClick={this.deleteCustomeQuiz}
                   >Remove</button> */}
                 </div>
               </li>
             )
           })}
         </ul>

       </div>
    )
}

export default CustomQuizIndex;
