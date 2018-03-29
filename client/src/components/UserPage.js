import React, {Component} from 'react';
import { User } from '../lib/requests';
import QuizIndex from './QuizIndex';


class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount(){
    const userId = localStorage.userId;
    //console.log('userId:', userId);
    User
      .one(userId)
      .then( user => {
        //console.log('user in then:', user)
        this.setState({
          user: user
        })
      })
  }

  render(){
    console.log('userPage-quizes: ', this.state.user.quizes);
    const user = this.state.user;
    const quizes = this.state.user.quizes;
      return(
        <main>
        <QuizIndex quizes={quizes} />
        </main>
      );
  }
}

export default UserPage;
