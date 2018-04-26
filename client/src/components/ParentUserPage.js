import React, { Component } from 'react';
import CustomQuizIndex from './CustomQuizIndex';
import CreateCustomQuiz from './CreateCustomQuiz';
import { User, CustomQuiz } from '../lib/requests';


class ParentUserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      parentUser: {},
      customQuizes: [],
      currentQuizSetUps: []
    }
    this.createCustomQuiz = this.createCustomQuiz.bind(this);
  }

  createCustomQuiz(customQuizData){
    CustomQuiz
      .create(customQuizData)
      .then( customQuiz => {
        console.log('customQuiz:', customQuiz);
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
    console.log('parentUser:', this.state.parentUser);
    return(
      <main className="ParentUserPage">
        <CreateCustomQuiz sendData={this.createCustomQuiz}/>
        <CustomQuizIndex customQuizes={this.state.customQuizes}/>
      </main>

    )
  }
}

export default ParentUserPage;
