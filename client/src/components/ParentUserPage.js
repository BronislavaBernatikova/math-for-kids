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
      currentQuizSetUps: [],
      modalState: false,
      modalQuizState: false,
      modalChildInfoState: false,
      modalQuizErrorState: false,
      modalSetUpErrorState: false
    }
    this.createCustomQuiz = this.createCustomQuiz.bind(this);
    this.setUpCurrentQuiz = this.setUpCurrentQuiz.bind(this);
    this.CreateNewChild = this.CreateNewChild.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.triggerQuizModal = this.triggerQuizModal.bind(this);
    this.closeQuizModal = this.closeQuizModal.bind(this);
    this.closeChildInfoModal = this.closeChildInfoModal.bind(this);
    this.closeQuizErrorModal = this.closeQuizErrorModal.bind(this);
    this.closeSetUpErrorModal = this.closeSetUpErrorModal.bind(this);
  }

  componentDidMount(){
    const userId = localStorage.userId;

    User
      .oneParent(userId)
      .then( user => {
        this.setState({
          parentUser: user,
          customQuizes: user.customQuizes,
          currentQuizSetUps: user.currentQuizSetUps
        })
      })
  }

  createCustomQuiz(customQuizData){
    CustomQuiz
      .create(customQuizData)
      .then( data => {
        if(!data.error){
          const {customQuizes} = this.state;
          this.setState({
            customQuizes: [data, ...customQuizes],
            modalQuizErrorState: false
          })
        }
        else{
          this.setState({
            modalQuizErrorState: true
          })
        }
      })
  }

  setUpCurrentQuiz(newSetUpData){
    CurrentQuizSetUp
      .update(newSetUpData)
      .then( data => {
        if(!data.error){
          this.setState({
            modalSetUpErrorState: false
          })
          window.location.reload(true);
        }
        else {
          this.setState({
            modalSetUpErrorState: true
          })
        }
      })
  }

  CreateNewChild(newUserData){
    User
      .createChildUser(newUserData)
      .then( data => {
        const {currentQuizSetUps} = this.state;

        if(!data.error){
          this.setState({
            currentQuizSetUps:  [data, ...currentQuizSetUps],
            modalState: false
          })
        }
        else {
          this.setState({
            modalChildInfoState: true
          })
        }
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
  triggerQuizModal(event){
    event.preventDefault();
    this.setState({
      modalQuizState: true
    })
  }
  closeQuizModal(event){
    event.preventDefault();
    this.setState({
      modalQuizState: false
    })
  }
  closeChildInfoModal(event){
    event.preventDefault();
    this.setState({
      modalChildInfoState: false
    })
  }
  closeQuizErrorModal(event){
    event.preventDefault();
    this.setState({
      modalQuizErrorState: false
    })
  }
  closeSetUpErrorModal(event){
    event.preventDefault();
    this.setState({
      modalSetUpErrorState: false
    })
  }

  render(){
    const {currentQuizSetUps} = this.state;

    return(
      <main className="ParentUserPage">

        <div className="text2">Your students</div>
        <div className="students">
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

          <div className="students-button">
          <div >
            <button
              className="modal-triger"
              onClick={this.triggerModal}
            >Add Student</button>
          </div>

          <div >
            <button
              className="modal-triger"
              onClick={this.triggerQuizModal}
            >Set Up Quiz</button>
          </div>
        </div>
        </div>

        <div className="modal" id="modal" style={{display: this.state.modalState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modal__content">
              <header className="modal__header">
                <div className="modal__title">Add a new student</div>
                <button className="modal__close"
                        onClick={this.closeModal}
                >x</button>
              </header>
              <div className="modal__body">
                <div >
                  <CreateNewChild onSubmit={this.CreateNewChild}/>
                </div>
              </div>

            </section>
          </div>
        </div>

        <div className="modal" id="modal-quiz" style={{display: this.state.modalQuizState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modalQuiz__content">
              <header className="modal__header">
                <div className="modal__title">Set us quiz for student</div>
                <button className="modal__close"
                        onClick={this.closeQuizModal}
                >x</button>
              </header>
              <div className="modal__body">
                <div >
                  <SetUpNewQuiz parentUser={this.state.parentUser}
                                currentQuizSetUps={this.state.currentQuizSetUps}
                                customQuizes={this.state.customQuizes}
                                onSubmit={this.setUpCurrentQuiz}
                  />
                </div>
              </div>

            </section>
          </div>
        </div>

        <CreateCustomQuiz sendData={this.createCustomQuiz}/>
        <CustomQuizIndex customQuizes={this.state.customQuizes}/>

        <div className="modal error"  style={{display: this.state.modalChildInfoState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modal__content">
              <header className="modal__header">
                <div className="modal__title">Ups, invalid data! Please, try again..
                  <div className="modal__info">
                  <br/>1. you forgot to fill up some information
                  <br/>2. or email address already exists
                  <br/>3. or your Password and Password Confirmation don't match
                  </div>
                </div>
                <button className="modal__close"
                        onClick={this.closeChildInfoModal}
                >x</button>
              </header>
            </section>
          </div>
        </div>

        <div className="modal error"  style={{display: this.state.modalQuizErrorState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modal__content">
              <header className="modal__header">
                <div className="modal__title">Ups, invalid data! Please, try again..
                  <div className="modal__info">
                  <br/>1. you forgot to fill up title
                  <br/>2. or your custom quiz does'n have any expressions
                  <br/>3. or one of the expressions doesn't have a solution
                  </div>
                </div>
                <button className="modal__close"
                        onClick={this.closeQuizErrorModal}
                >x</button>
              </header>
            </section>
          </div>
        </div>

        <div className="modal error"  style={{display: this.state.modalSetUpErrorState ? 'table' : 'none' }}>
          <div className="modal__dialog">
            <section className="modal__content">
              <header className="modal__header">
                <div className="modal__title">Ups, invalid data! Please, try again..
                  <div className="modal__info">
                  <br/>1. you forgot to choose student
                  <br/>2. you have to choose either difficulty, number of expression and operator or custom quiz
                  </div>
                </div>
                <button className="modal__close"
                        onClick={this.closeSetUpErrorModal}
                >x</button>
              </header>
            </section>
          </div>
        </div>

      </main>
    )
  }
}

export default ParentUserPage;
