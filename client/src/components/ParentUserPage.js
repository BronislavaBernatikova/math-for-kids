import React, { Component } from 'react';
import CustomQuizIndex from './CustomQuizIndex';
import CreateCustomQuiz from './CreateCustomQuiz';
import SetUpNewQuiz from './SetUpNewQuiz';
import CreateNewChild from './CreateNewChild';
import { User, CustomQuiz, CurrentQuizSetUp } from '../lib/requests';


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
  }

  createCustomQuiz(customQuizData){
    CustomQuiz
      .create(customQuizData)
      .then( newCustomQuiz => {
        const {customQuizes} = this.state;
        console.log('newCustomQuiz:', newCustomQuiz);
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

  componentDidMount(){
    const userId = localStorage.userId;

    User
      .oneParent(userId)
      .then( user => {
        console.log('user:', user);
        this.setState({
          parentUser: user,
          customQuizes: user.customQuizes,
          currentQuizSetUps: user.currentQuizSetUps
        })
      })

  }

  render(){
    // const {parentUser} = this.state;
    // console.log('parentUser in render userpage:', this.state.parentUser);

    return(
      <main className="ParentUserPage">
        <CreateCustomQuiz sendData={this.createCustomQuiz}/>
        <SetUpNewQuiz parentUser={this.state.parentUser}
                      currentQuizSetUps={this.state.currentQuizSetUps}
                      customQuizes={this.state.customQuizes}
                      onSubmit={this.setUpCurrentQuiz}
        />
        <CreateNewChild onSubmit={this.CreateNewChild}/>
        <CustomQuizIndex customQuizes={this.state.customQuizes}/>
      </main>
    )
  }
}

export default ParentUserPage;
