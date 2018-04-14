import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

function QuizIndex (props) {
  const { quizes = [] } = props;

  return(
    <div className="QuizIndex"
         style={{margin: '0 2rem'}}
      >
      <Table color="olive" key="olive" >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Expressions</Table.HeaderCell>
            <Table.HeaderCell>Right Answers</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            quizes.map((quiz,index) => {
            return(
              <Table.Row key={index} id={`row${index}`}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{(quiz.date).slice(0,10)}</Table.Cell>
                <Table.Cell>{quiz.expression_count}</Table.Cell>
                <Table.Cell>{quiz.right_answer_count}</Table.Cell>
                <Table.Cell>{quiz.time}</Table.Cell>
                <Table.Cell>
                  <Link to={`/quizes/show/${quiz.id}`}>Repeat Quiz</Link>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
export default QuizIndex;
