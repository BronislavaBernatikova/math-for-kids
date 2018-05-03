import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomQuizIndex from './CustomQuizIndex';
import CreateCustomQuiz from './CreateCustomQuiz';
import SetUpNewQuiz from './SetUpNewQuiz';
import CreateNewChild from './CreateNewChild';
import { User, CustomQuiz, CurrentQuizSetUp } from '../lib/requests';
import '../styling/ParentUserPage.css';


class ParentUserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      parentUser: {},
      customQuizes: [],
      currentQuizSetUps: []
    }
    this.createCustomQuiz = this.createCustomQuiz.bind(this);
    this.setUpCurrentQuiz = this.setUpCurrentQuiz.bind(this);
    this.CreateNewChild = this.CreateNewChild.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  createCustomQuiz(customQuizData){
    CustomQuiz
      .create(customQuizData)
      .then( newCustomQuiz => {
        const {customQuizes} = this.state;
        // console.log('newCustomQuiz:', newCustomQuiz);
        this.setState({
          customQuizes: newCustomQuiz, ...customQuizes
        })
        console.log('customeQuizes in state:', this.state.customQuizes);
      })
  }

  setUpCurrentQuiz(data){
    console.log('setUpCurrentQuiz:', data);
    CurrentQuizSetUp
      .update(data)
      // .then( updatedQuiz => {
      //   console.log('updatedQuiz:', updatedQuiz);
      // })
  }

  CreateNewChild(newUserData){
    User
      .createChildUser(newUserData)
      .then( userData => {
        console.log('userData:', userData);
      })
  }
  triggerModal(event){
    event.preventDefault();
    this.setState({
      modalState: true
    })
  }
  closeModal(event){
    event.preventDefault();
    this.setState({
      modalState: false
    })
  }
  componentDidMount(){
    const userId = localStorage.userId;

    User
      .oneParent(userId)
      .then( user => {
        console.log('user:', user);
        this.setState({
          parentUser: user,
          customQuizes: user.customQuizes,
          currentQuizSetUps: user.currentQuizSetUps,
          modalState: false
        })
      })

  }

  render(){
    const {currentQuizSetUps, modalState} = this.state;
    const students = currentQuizSetUps.length;
    console.log('currentQuizSetUps:',currentQuizSetUps);

    return(
      <main className="ParentUserPage">
        <div className="students">
          <div className="text2">
              <div>Your students:</div>
          </div>

          <div className="students-list">
              <ul>
              {
                currentQuizSetUps.map((currentQuizSetUp,index) => {
                  return(
                  <li key={index} id={`{index}`}>
                    <Link to={{
                              pathname: `/students/show/${currentQuizSetUp.id}`,
                              state: { currentQuizSetUp: currentQuizSetUp }
                            }}>{currentQuizSetUp.first_name}{" "}{currentQuizSetUp.last_name}</Link>
                  </li>
                )})
              }
              </ul>
          </div>
        </div>

        <button
          className="modal-triger"
          onClick={this.triggerModal}
        >Trigger modal</button>

        <div className="modal" id="modal" style={{display: this.state.modalState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modal__content">
              <header className="modal__header">
                <h2 className="modal__title">This is simple modal title.</h2>
                <button className="modal__close"
                        onClick={this.closeModal}
                >x</button>
              </header>
              <div className="modal__body">
                  <CreateNewChild onSubmit={this.CreateNewChild}/>
              </div>
              <footer className="modal__footer"></footer>
            </section>
          </div>
        </div>

        <CreateCustomQuiz sendData={this.createCustomQuiz}/>
        <CustomQuizIndex customQuizes={this.state.customQuizes}/>
        <SetUpNewQuiz parentUser={this.state.parentUser}
                      currentQuizSetUps={this.state.currentQuizSetUps}
                      customQuizes={this.state.customQuizes}
                      onSubmit={this.setUpCurrentQuiz}
        />
        {/* <CreateNewChild onSubmit={this.CreateNewChild}/> */}
      </main>
    )
  }
}

export default ParentUserPage;
